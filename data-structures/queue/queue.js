/**
 * Queue implementation.
 * @param {Number} maxSize Maximum number of elements in the queue (optional).
 * @see https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
 */
function Queue(maxSize) {

    /**
     * Maximum number of elements in the queue.
     * @optional
     * @private
     * @type {Number}
     */
    this._maxSize = maxSize;

    /**
     * Pointer to the last element of the queue.
     * @private
     * @type {Number}
     */
    this._last = -1;

    /**
     * Elements of the queue.
     * @private
     * @type {Array}
     */
    this._els = [];
}

/**
 * Adds element to the queue.
 * If the queue is full - throws an error.
 * @param  {any} el New element
 */
Queue.prototype.enqueue = function(el) {

    if (this.isFull()) {
        throw new Error('Reached maximum size of the queue.');
    }

    this._els[++this._last] = el;
};

/**
 * Removes element from the queue.
 * If the queue is empty - throws an error.
 * @return {any} Element
 */
Queue.prototype.dequeue = function() {

    if (this.isEmpty()) {
        throw new Error('Queue is empty.');
    }

    var el = this._els[0];
    this._els.splice(0, 1);
    this._last--;
    return el;
};

/**
 * Returns the next element of the queue without removing it.
 * If the queue is empty - returns null.
 * @return {any} Element
 */
Queue.prototype.peek = function() {
    return this._els[0] || null;
};

/**
 * Returns number of elements in the queue.
 * @return {Number}
 */
Queue.prototype.size = function() {
    return this._els.length;
};

/**
 * Removes all elements from the queue.
 */
Queue.prototype.empty = function() {
    this._els.splice(0, this._els.length);
    this._last = -1;
};

/**
 * Checks if the queue does not contain any elements.
 * @return {Boolean}
 */
Queue.prototype.isEmpty = function() {
    return this._last === -1;
};

/**
 * Checks if the queue is full.
 * If maxSize is not set - always returns false.
 * @return {Boolean}
 */
Queue.prototype.isFull = function() {
    return this._maxSize && this._last >= this._maxSize - 1;
};

/**
 * Returns elements of the queue as an array in the same order.
 * @return {Array}
 */
Queue.prototype.toArray = function() {
    return this._els;
};
