/**
 * Implementation of stack.
 * @param {Number} maxSize Maximum size of the stack (optional).
 * @see https://en.wikipedia.org/wiki/Stack_(abstract_data_type)
 */
function Stack(maxSize) {

    /**
     * Maximum size of the stack.
     * @optional
     * @private
     * @type {Number}
     */
    this._maxSize = maxSize;

    /**
     * Pointer to the top element of the stack.
     * @private
     * @type {Number}
     */
    this._top = -1;

    /**
     * Stack contents.
     * @private
     * @type {Array}
     */
    this._els = [];
}

/**
 * Adds the element on top pf the stack.
 * If the stack is full - throws an error.
 * @param  {any} el New element.
 */
Stack.prototype.push = function(el) {

    if (this.isFull()) {
        throw new Error('Reached maximum size of the stack.');
    }

    this._els[++this._top] = el;
};

/**
 * Removes the top element from the stack and returns it.
 * If the stack is empty - throws an error.
 * @return {any} Top element of the stack.
 */
Stack.prototype.pop = function() {

    if (this._top === -1) {
        throw new Error('Stack is empty.');
    }

    var el = this._els[this._top];
    this._els.splice(this._top--, 1);
    return el;
};

/**
 * Returns the top element of the stack without removing it.
 * If the stack is empty - returns null.
 * @return {any} Top element of the stack.
 */
Stack.prototype.peek = function() {
    return this._els[this._top] || null;
};

/**
 * Returns number of elements in the stack.
 * @return {Number}
 */
Stack.prototype.size = function() {
    return this._els.length;
};

/**
 * Removes all elements from the stack.
 */
Stack.prototype.empty = function() {
    this._els.splice(0, this._els.length);
    this._top = -1;
};

/**
 * Checks if the stack is empty - ie. contains no elements.
 * @return {Boolean}
 */
Stack.prototype.isEmpty = function() {
    return this._top === -1;
};

/**
 * Checks if the stack is full. 
 * If maxSize was not set - always returns false.
 * @return {Boolean}
 */
Stack.prototype.isFull = function() {
    return this._maxSize && this._top >= this._maxSize - 1;
};

/**
 * Returns elements of the stack as an array.
 * @return {Array}
 */
Stack.prototype.toArray = function() {
    return this._els;
};

/**
 * Generates visualization of the stack.
 * @return {String}
 */
Stack.prototype.pretty = function() {

    var s = [];
    s.push('|          |\n');

    for (var i = 0, l = this.size(); i < l; i++) {
        s.push('|');

        var el = '' + this._els[i];
        while (el.length < 10) {
            el = ' ' + el;
        }

        s.push(el);
        s.push('|');
        s.push('\n');
    }

    s.push('------------');
    return s.join('');
};
