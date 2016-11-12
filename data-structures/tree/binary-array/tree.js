/**
 * Binary tree represented using an array.
 * @see https://en.wikipedia.org/wiki/Binary_tree
 *
 *           1
 *          / \
 *        2    3
 *       / \    \
 *      4   5    7
 *          ||
 *          \/
 * [1, 2, 3, 4, 5, null, 7]
 * 
 * @param {any} data Root node data
 */
function Tree(data) {

    if (!data) {
        throw new Error('Invalid input.');
    }

    this._els = [];

    this.root = new Node(data, 0);
    this._els.push(this.root);
}

/**
 * Returns the left child of the node with the specified index.
 * @param  {Number} index Parent node index
 * @return {Node}         Left node
 */
Tree.prototype.getLeft = function(index) {

    if (index < 0) {
        throw new Error('Invalid index.');
    }

    return this._els[2 * index + 1] || null;
};

/**
 * Returns the right child of the node with the specified index.
 * @param  {Number} index Parent node index
 * @return {Node}         Right node
 */
Tree.prototype.getRight = function(index) {

    if (index < 0) {
        throw new Error('Invalid index.');
    }

    return this._els[2 * index + 2] || null;
};

/**
 * Updates the data of the left child of the node with the specified index.
 * @param {Number} index Parent node index
 * @param {any}    data  New data
 */
Tree.prototype.setLeft = function(index, data) {

    if (index < 0) {
        throw new Error('Invalid index.');
    }

    var elIndex = 2 * index + 1,
        el = this._els[elIndex];
    if (el) {
        el.data = data;
    } else {
        el = new Node(data, elIndex);
        this._els[elIndex] = el;
    }
};

/**
 * Updates the data of the right child of the node with the specified index.
 * @param {Number} index Parent node index
 * @param {any}    data  New data
 */
Tree.prototype.setRight = function(index, data) {

    if (index < 0) {
        throw new Error('Invalid index.');
    }

    var elIndex = 2 * index + 2,
        el = this._els[elIndex];
    if (el) {
        el.data = data;
    } else {
        el = new Node(data, elIndex);
        this._els[elIndex] = el;
    }
};

/**
 * Runs depth-first traversal in pre-order (parent first).
 * @param  {Number} index Node index
 * @return {Array}        A sequence of nodes' data
 */
Tree.prototype.dfsPreorder = function(index) {

    if (index < 0) {
        throw new Error('Invalid index.');
    }

    var order = [],
        el;

    if (el = this._els[index]) {

        order.push(el.data);

        var left = this.getLeft(index),
            right = this.getRight(index);

        if (left) {
            order = order.concat(this.dfsPreorder(left.index));
        }
        if (right) {
            order = order.concat(this.dfsPreorder(right.index));
        }
    }

    return order;
};

/**
 * Runs depth-first traversal in post-order.
 * @param  {Number} index Node index
 * @return {Array}        A sequence of nodes' data
 */
Tree.prototype.dfsPostorder = function(index) {

    if (index < 0) {
        throw new Error('Invalid index.');
    }

    var order = [],
        el;

    if (el = this._els[index]) {

        var left = this.getLeft(index),
            right = this.getRight(index);

        if (left) {
            order = order.concat(this.dfsPostorder(left.index));
        }
        if (right) {
            order = order.concat(this.dfsPostorder(right.index));
        }

        order.push(el.data);
    }

    return order;
};

/**
 * Runs depth-first search in order.
 * @param  {Number} index Node index
 * @return {Array}        A sequence of nodes' data
 */
Tree.prototype.dfsInorder = function(index) {

    if (index < 0) {
        throw new Error('Invalid index.');
    }

    var order = [],
        el;

    if (el = this._els[index]) {

        var left = this.getLeft(index),
            right = this.getRight(index);

        if (left) {
            order = order.concat(this.dfsInorder(left.index));
        }

        order.push(el.data);

        if (right) {
            order = order.concat(this.dfsInorder(right.index));
        }
    }

    return order;
};

/**
 * Runs breadth-first search.
 * @param  {Number} index [description]
 * @return {[type]}       [description]
 */
Tree.prototype.bfs = function(index) {

    if (index < 0) {
        throw new Error('Invalid index.');
    }

    var queue = new Queue(),
        order = [];

    if (this._els[index]) {
        queue.enqueue(this._els[index]);
    }

    while (!queue.isEmpty()) {
        var el = queue.dequeue(),
            left = this.getLeft(el.index),
            right = this.getRight(el.index);

        order.push(el.data);

        if (left) {
            queue.enqueue(left);
        }
        if (right) {
            queue.enqueue(right);
        }
    }

    return order;
};

/**
 * Swaps left subtree with right subtree, making a mirror reflection of the tree.
 */
Tree.prototype.invert = function() {

    if (this._els.length === 0) {
        return;
    }

    var level = 1,
        index = 1,
        total = Math.pow(2, level),
        lastIndex = index + total - 1;

    while (index < this._els.length) {

        for (var i = 0; i < total / 2; i++) {

            [this._els[i + index], this._els[lastIndex - i]] = [this._els[lastIndex - i], this._els[i + index]];

            if (this._els[i + index]) {
                this._els[i + index].index = i + index;
            }
            if (this._els[lastIndex - i]) {
                this._els[lastIndex - i].index = lastIndex - i;
            }
        }

        level++;
        index += total;
        total = Math.pow(2, level);
        lastIndex += total;
    }
};
