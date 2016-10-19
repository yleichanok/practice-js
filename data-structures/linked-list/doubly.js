/**
 * Singly linked list implementation.
 * Each node in the list has references to the next and the previous nodes.
 * @param {Boolean} circular Indicates if the list is circular (optional)
 * @see https://en.wikipedia.org/wiki/Linked_list#Doubly_linked_list
 */
function DoublyLinkedList(circular) {

    /**
     * Pointer to the first element of the list.
     * @type {Node}
     */
    this.head = null;

    /**
     * Storage for list elements.
     * @private
     * @type {Array}
     */
    this._els = [];

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
 * Returns the last element of the list.
 * @private
 * @return {any}
 */
DoublyLinkedList.prototype._last = function() {

    var lastNode = this.head;
    
    for (var i = 1, l = this.size(); i < l; i++) {
        lastNode = lastNode.next;
    }

    return lastNode;
};

/**
 * Checks if there are any elements in the list.
 * @return {Boolean}
 */
DoublyLinkedList.prototype.isEmpty = function() {
    return this.head === null;
};

/**
 * Returns number of elements in the list.
 * @return {Number}
 */
DoublyLinkedList.prototype.size = function() {
    var size = 0,
        lastNode = this.head;

    while (lastNode) {
        size++;

        if (this._circular && lastNode && lastNode.next === this.head) {
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
DoublyLinkedList.prototype.append = function(data) {

    var next = this._circular ? this.head : null,
        prev = this._last(),
        node = new Node(data, next, prev);

    this._els.push(node);

    if (!this.head) {
        this.head = node;
    } else {
        this._last().next = node;

        if (this._circular) {
            this.head.prev = node;
        }
    }
};

/**
 * Adds new node the beginning of the list.
 * Sets head of the list to the added node.
 * @param  {any} data New element
 */
DoublyLinkedList.prototype.prepend = function(data) {

    var last = this._last(),
        prev = this._circular ? this._last() : null,
        node = new Node(data, this.head, prev);
    this._els.push(node);

    if (this.head) {
        this.head.prev = node;
    }
    this.head = node;
};

/**
 * Reverses the order of the list elements.
 */
DoublyLinkedList.prototype.reverse = function() {

    if (!this.head) {
        return;
    }

    var curNode = this.head,
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

    this.head = prevNode;
};

/**
 * Removes one node from the list; updates links.
 * @param  {Node} node Node to remove
 * @throws {Error} If node is not in the list
 */
DoublyLinkedList.prototype.remove = function(node) {

    if (!this.head) {
        throw new Error('Node not found.');
    }

    var prevNode = this._circular ? this._last() : null,
        curNode = this.head;

    for (var i = 0, l = this.size(); i < l; i++) {
        if (curNode === node) {
            break;
        }

        if (!curNode || (this._circular && curNode.next === this.head)) {
            throw new Error('Node not found.');
        }

        prevNode = curNode;
        curNode = curNode.next;
    }

    // update reference to the next and prev node
    prevNode.next = node.next;
    node.next.prev = prevNode;

    // update head if it was removed
    if (node === this.head) {
        this.head = node.next;
    }
 
    // remove node from the storage
    for (var i = 0, l = this.size(); i < l; i++) {
        if (this._els[i] === node) {
            this._els.splice(i, 1);
            break;
        }
    }
};

/**
 * Removes all elements from the list.
 */
DoublyLinkedList.prototype.empty = function() {
    this._els.splice(0, this._els.length);
    this.head = null;
};
