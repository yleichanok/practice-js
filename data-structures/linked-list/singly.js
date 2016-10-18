function SinglyLinkedList() {

    /**
     * Pointer to the first element of the list.
     * @type {Node}
     */
    this.head = null;

    /**
     * Storage for list elements;
     * @private
     * @type {Array}
     */
    this._els = [];
}

/**
 * Checks if there are any elements in the list.
 * @return {Boolean}
 */
SinglyLinkedList.prototype.isEmpty = function() {
    return this.head === null;
};

/**
 * Adds new node to the end of the list.
 * @param  {any} data New element
 */
SinglyLinkedList.prototype.append = function(data) {

    var node = new Node(data);
    this._els.push(node);

    if (!this.head) {
        this.head = node;
    } else {
        var lastNode = this.head;
        while (lastNode.next) {
            lastNode = lastNode.next;
        }
        lastNode.next = node;
    }
};

/**
 * Adds new node the beginning of the list.
 * Sets head of the list to the added node.
 * @param  {any} data New element
 */
SinglyLinkedList.prototype.prepend = function(data) {

    var node = new Node(data, this.head);
    this._els.push(node);
    this.head = node;
};

/**
 * Reverses the order of the list elements.
 */
SinglyLinkedList.prototype.reverse = function() {

    if (!this.head) {
        return;
    }

    var curNode = this.head,
        nextNode = null,
        prevNode = null;

    while (curNode !== null) {
        nextNode = curNode.next;
        curNode.next = prevNode;
        prevNode = curNode;
        curNode = nextNode;
    }

    this.head = prevNode;
};

/**
 * Removes one node from the list; updates links.
 * @param  {Node} node Node to remove
 */
SinglyLinkedList.prototype.remove = function(node) {

    var prevNode = null,
        curNode = this.head;

    while (curNode !== node) {
        prevNode = curNode;
        curNode = curNode.next;
    }

    // update reference to the next node
    prevNode.next = node.next;

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
SinglyLinkedList.prototype.empty = function() {
    this._els.splice(0, this._els.length);
    this.head = null;
};
