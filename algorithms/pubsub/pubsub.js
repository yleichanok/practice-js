/**
 * Simple implementation of the Publish-Subscribe pattern.
 * Call .subcribe() to start listening for the event;
 *      .publish() to broadcast the event to all subscribers;
 *      .unsubscribe() to stop listening.
 *
 * @see https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
 */
function PubSub() {

    if (this instanceof PubSub === false) {
        return new PubSub();
    }

    this._subscribtions = {};
}

/**
 * Broadcasts the event to all subscribers.
 * @param  {String} event Event to publish
 */
PubSub.prototype.publish = function(event) {

    if (this._subscribtions[event]) {
        this._subscribtions[event].forEach(function(handler) {
            handler();
        });
    }

    return this;
};

/**
 * Adds the handler to subscribers of the particular event.
 * @param  {String} event     Event
 * @param  {Function} handler Handler function
 */
PubSub.prototype.subscribe = function(event, handler) {

    // validate arguments
    if (!event || typeof event !== 'string') {
        throw new Error('Invalid event.');
    }
    if (typeof handler !== 'function') {
        throw new Error('Invalid handler.');
    }

    if (!this._subscribtions[event]) {
        this._subscribtions[event] = [];
    }

    // check if the handler is already subscribed
    if (this._subscribtions[event].filter(function(h) {
        return h === handler;
    }).length === 0) {
        this._subscribtions[event].push(handler);
    }

    return this;
};

/**
 * Removes handler from the subscribtions.
 * @param  {String} event     Event
 * @param  {Function} handler Handler function
 */
PubSub.prototype.unsubscribe = function(event, handler) {

    // validate arguments
    if (!event || typeof event !== 'string') {
        throw new Error('Invalid event.');
    }
    if (typeof handler !== 'function') {
        throw new Error('Invalid handler.');
    }

    // do nothing if not found
    if (this._subscribtions[event]) {
        for (var i = 0, l = this._subscribtions[event].length; i < l; i++) {
            if (this._subscribtions[event][i] === handler) {
                this._subscribtions[event].splice(i, 1);
                break;
            }
        }
    }

    return this;
};
