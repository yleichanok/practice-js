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
 * Performs depth-first search using pre-order.
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

/**
 * Performs depth-first search using post-order.
 * @param  {Node} node Node to do search on
 * @return {Array} A sequence of nodes' data
 */
Tree.prototype.dfsPostorder = function(node) {

    var order = [];

    if (node) {
        order = order.concat(this.dfsPostorder(node.getLeft()));
        order = order.concat(this.dfsPostorder(node.getRight()));
        order.push(node.data);
    }

    return order;
};

/**
 * Performs depth-first search using in-order.
 * @param  {Node} node Node to do search on
 * @return {Array} A sequence of nodes' data
 */
Tree.prototype.dfsInorder = function(node) {

    var order = [];

    if (node) {
        order = order.concat(this.dfsInorder(node.getLeft()));
        order.push(node.data);
        order = order.concat(this.dfsInorder(node.getRight()));
    }

    return order;
};

/**
 * Performs breadth-first search (level-order).
 * @param  {Node} node Node to start search from
 * @return {Array} A sequence of nodes' data
 */
Tree.prototype.bfs = function(node) {

    var q = new Queue(),
        order = [];

    if (node) {
        q.enqueue(node);
    }

    while (!q.isEmpty()) {
        var next = q.dequeue(),
            left = next.getLeft(),
            right = next.getRight();

        order.push(next.data);

        if (left) {
            q.enqueue(left);
        }
        if (right) {
            q.enqueue(right);
        }
    }

    return order;
};

/**
 * Searches for the node with the specified data and returns true if found.
 * @param  {any} data Data to search for
 * @return {Boolean}
 */
Tree.prototype.contains = function(data) {

    var cur = this.root;

    while (cur) {

        if (cur.data > data) {
            cur = cur.getLeft();
        } else if (cur.data < data) {
            cur = cur.getRight();
        } else {
            return true;
        }
    }

    return false;
};
