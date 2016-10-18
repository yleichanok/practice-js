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
 * Inserts a new node after some existing node.
 * @param  {Node} node    Existing node
 * @param  {Node} newNode New node to insert
 * @todo
 */
SinglyLinkedList.prototype.insertAfter = function(node, newNode) {

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
 * @todo
 */
SinglyLinkedList.prototype.remove = function(node) {

};

/**
 * Removes all elements from the list.
 */
SinglyLinkedList.prototype.empty = function() {
    this._els.splice(0, this._els.length);
    this.head = null;
};
