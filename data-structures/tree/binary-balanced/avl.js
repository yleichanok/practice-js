/**
 * AVL Tree implementation.
 *
 * @see https://en.wikipedia.org/wiki/AVL_tree
 * @param {Array} arr Array of elements
 */
function AVLTree(arr) {

    Tree.call(this, arr);
}

AVLTree.prototype = Object.create(Tree.prototype);
AVLTree.prototype.constructor = AVLTree;

AVLTree.prototype.insert = function(data) {

    Tree.prototype.insert.call(this, data);
    this.balance();
};

AVLTree.prototype.delete = function() {

    Tree.prototype.delete.call(this, data);
    this.balance();
};

AVLTree.prototype.balance = function() {

};
