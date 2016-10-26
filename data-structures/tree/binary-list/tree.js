/**
 * Binary tree data structure. Represented using linked list.
 * @see https://en.wikipedia.org/wiki/Binary_tree
 * @param {any} data Data for the root node
 */
function Tree(data) {

    if (!data) {
        throw new Error('Invalid input.');
    }

    this.root = new Node(data);
}

/**
 * Performs depth-first search in pre-order.
 * @see https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search
 * 
 * @param  {Node} node Node to perform search on
 * @return {Array} A sequence of nodes' data
 */
Tree.prototype.dfsPreorder = function(node) {
    
    var order = [];

    if (node) {
        order.push(node.data);
        order = order.concat(this.dfsPreorder(node.getLeft()));
        order = order.concat(this.dfsPreorder(node.getRight()));
    }

    return order;
};