/**
 * Tree node for n-ary trees.
 * @param {any} data   Node data
 * @param {Node} parent Parent node (optional for root)
 * @param {Array} children   Child nodes (optional)
 */
function Node(data, parent, children) {

    this.data = data;

    this._parent = parent || null;
    this._children = children || [];
}

Node.prototype.getParent = function() {
    return this._parent;
};

Node.prototype.getChildren = function() {
    return this._children;
};
Node.prototype.addChild = function(data) {
    this._children.push(new Node(data, this));
    return this._children[this._children.length - 1];
};
Node.prototype.addChildren = function(arr) {
    var self = this;
    arr.forEach(function(data) {
        self.addChild(data);
    });
    return this._children;
};