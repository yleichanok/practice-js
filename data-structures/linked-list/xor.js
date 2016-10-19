/**
 * Emulation of XOR linked list in JS.
 * There is no good way of converting node references to numbers,
 * so we have to generate abstract unique ids for each node
 * and then use them as operands in exclusive OR.
 *
 * This particular implementation doesn't have better memory consumption 
 * than a regular doubly linked list - generated ids also take some space.
 * @see https://en.wikipedia.org/wiki/XOR_linked_list
 */
function XORLinkedList() {

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
 * Returns the last element of the list.
 * @private
 * @return {any}
 */
XORLinkedList.prototype._last = function() {

    var lastNode = this.head;
    
    for (var i = 1, l = this.size(); i < l; i++) {
        lastNode = lastNode.next;
    }

    return lastNode;
};

/**
 * Method returns the biggest generated id that is being used for list nodes.
 * @return {Number}
 */
XORLinkedList.prototype._maxId = function() {

    var maxId = this.head ? this.head.id : 0,
        lastNode = this.head;
    
    for (var i = 1, l = this.size(); i < l; i++) {
        lastNode = lastNode.next;

        if (lastNode && lastNode.id > maxId) {
            maxId = lastNode.id;
        }
    }

    return maxId;
};

/**
 * Checks if there are any elements in the list.
 * @return {Boolean}
 */
XORLinkedList.prototype.isEmpty = function() {
    return this.head === null;
};

/**
 * Returns number of elements in the list.
 * @return {Number}
 */
XORLinkedList.prototype.size = function() {
    
    var size = 0,
        prevNode = null,
        curNode = this.head;

    while (curNode) {
        size++;

        var id = prevNode ? prevNode.id : 0;
        prevNode = curNode;

        curNode = this._els.filter(function(item) {
            return item.id === curNode.getNextId(id);
        })[0];
    }

    return size;
};

/**
 * Adds new node to the end of the list.
 * @param  {any} data New element
 */
XORLinkedList.prototype.append = function(data) {

    var next = null,
        prev = this._last(),
        node = new XORNode(data, this._maxId() + 1, 0, prev ? prev.id : 0);

    this._els.push(node);

    if (!this.head) {
        this.head = node;
    } else {
        var lastNode = this._last();
        lastNode.updateRef(node.id, lastNode.getPrevId());
    }
};
