/**
 * Singly linked list implementation.
 * Each node in the list has references to the next and the previous nodes.
 * @param {Boolean} circular Indicates if the list is circular (optional)
 * @see https://en.wikipedia.org/wiki/Linked_list#Doubly_linked_list
 */
function List(circular) {

    /**
     * Pointer to the first element of the list.
     * @type {Node}
     */
    this._head = null;

    /**
     * Indicates if the list is circular.
     * Doubly linked list is circular if:
     * the prev pointer of the first element is linked to the last element of the list;
     * the next pointer of the last element is linked to the first element of the list.
     * @type {Boolean}
     */
    this._circular = circular;
}

/**
 * Checks if there are any elements in the list.
 * @return {Boolean}
 */
List.prototype.isEmpty = function() {

    return this._head === null;
};

/**
 * Returns true if the last node of the list points to the head.
 * @return {Boolean}
 */
List.prototype.isCircular = function() {

    return this._circular;
};

/**
 * Returns the head of the list.
 * @return {Node}
 */
List.prototype.first = function() {

    return this._head;
};

/**
 * Returns the last element of the list.
 * @private
 * @return {any}
 */
List.prototype.last = function() {

    var lastNode = this._head;
    
    for (var i = 1, l = this.size(); i < l; i++) {
        lastNode = lastNode.next;
    }

    return lastNode;
};

/**
 * Returns number of elements in the list.
 * @return {Number}
 */
List.prototype.size = function() {

    var size = 0,
        lastNode = this._head;

    while (lastNode) {
        size++;

        if (this._circular && lastNode && lastNode.next === this._head) {
            break;
        }

        lastNode = lastNode.next;
    }

    return size;
};

/**
 * Adds new node to the end of the list.
 * @param  {any} data New element
 */
List.prototype.append = function(data) {

    var nextNode = this._circular ? this._head : null,
        prevNode = this.last(),
        node = new Node(data, nextNode, prevNode);

    if (!this._head) {
        this._head = node;
    } else {
        var lastNode = this.last();
        lastNode.next = node;

        if (this._circular) {
            this._head.prev = node;
        }
    }
};

/**
 * Adds new node the beginning of the list.
 * Sets head of the list to the added node.
 * @param  {any} data New element
 */
List.prototype.prepend = function(data) {

    var last = this.last(),
        prev = this._circular ? this.last() : null,
        node = new Node(data, this._head, prev);

    if (this._head) {
        this._head.prev = node;
    }
    this._head = node;
};

/**
 * Reverses the order of the list elements.
 */
List.prototype.reverse = function() {

    if (!this._head) {
        return;
    }

    var curNode = this._head,
        nextNode = null,
        prevNode = null;

    for (var i = 0, l = this.size(); i < l; i++) {
        nextNode = curNode.next;
        prevNode = curNode.prev;

        curNode.next = prevNode;
        curNode.prev = nextNode;

        prevNode = curNode;
        curNode = nextNode;
    }

    this._head = prevNode;
};

/**
 * Removes one node from the list; updates links.
 * @param  {Node} node Node to remove
 * @throws {Error} If node is not in the list
 */
List.prototype.remove = function(node) {

    if (!this._head) {
        throw new Error('Node not found.');
    }

    var prevNode = this._circular ? this.last() : null,
        curNode = this._head;

    for (var i = 0, l = this.size(); i < l; i++) {
        if (curNode === node) {
            break;
        }

        if (!curNode || (this._circular && curNode.next === this._head)) {
            throw new Error('Node not found.');
        }

        prevNode = curNode;
        curNode = curNode.next;
    }

    // update reference to the next and prev node
    prevNode.next = node.next;
    node.next.prev = prevNode;

    // update head if it was removed
    if (node === this._head) {
        this._head = node.next;
    }
};

/**
 * Removes all elements from the list, resets the head.
 */
List.prototype.empty = function() {

    this._head = null;
};

/**
 * Generates vizualization of the list.
 * @return {String}
 */
List.prototype.pretty = function() {

    var s = [];
    if (this._circular) {
        s.push('-> <- ');
    }

    var cur = this._head;
    while (cur) {
        s.push(cur.data);

        if (cur.next) {
            s.push(' -> <- ');
        }

        if (cur.next !== this._head) {
            cur = cur.next;
        } else {
            cur = null;
        }
    }

    return s.join('').trim();
};
