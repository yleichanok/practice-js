/**
 * Tree node for binary trees. Supports methods chaining.
 * @param {any} data   Node data
 * @param {Node} parent Parent node (optional for root)
 * @param {Node} left   Left child (optional)
 * @param {Node} right  Right child (optional)
 */
function Node(data, parent, left, right) {

    this.data = data;

    this._parent = parent || null;
    this._left = left || null;
    this._right = right || null;
}

Node.prototype.getParent = function() {
    return this._parent;
}

Node.prototype.getLeft = function() {
    return this._left;
};
Node.prototype.setLeft = function(data) {
    this._left = new Node(data, this);
    return this._left;
};

Node.prototype.getRight = function() {
    return this._right;
};
Node.prototype.setRight = function(data) {
    this._right = new Node(data, this);
    return this._right;
};