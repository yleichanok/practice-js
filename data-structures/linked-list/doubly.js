/**
 * Singly linked list implementation.
 * Each node in the list has references to the next and the previous nodes.
 * @see https://en.wikipedia.org/wiki/Linked_list#Doubly_linked_list
 */
function DoublyLinkedList() {

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
}

/**
 * Checks if there are any elements in the list.
 * @return {Boolean}
 */
DoublyLinkedList.prototype.isEmpty = function() {
    return this.head === null;
};

/**
 * Adds new node to the end of the list.
 * @param  {any} data New element
 */
DoublyLinkedList.prototype.append = function(data) {

    var lastNode = this.head;
    while (lastNode && lastNode.next) {
        lastNode = lastNode.next;
    }

    var node = new Node(data, null, lastNode);
    this._els.push(node);

    if (!this.head) {
        this.head = node;
    } else {
        lastNode.next = node;
    }
};

/**
 * Adds new node the beginning of the list.
 * Sets head of the list to the added node.
 * @param  {any} data New element
 */
DoublyLinkedList.prototype.prepend = function(data) {

    var node = new Node(data, this.head);
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

    while (curNode !== null) {
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
 */
DoublyLinkedList.prototype.remove = function(node) {

    var prevNode = null,
        curNode = this.head;

    while (curNode !== node) {
        prevNode = curNode;
        curNode = curNode.next;
    }

    // update reference to the next and previous nodes
    prevNode.next = node.next;
    prevNode.next.prev = prevNode;

    // remove node from the storage
    for (var i = 0; i < this._els.length; i++) {
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
