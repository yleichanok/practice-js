/**
 * AVL tree data structure. Represented using linked list.
 * Each node has 'count' property to handle duplicates.
 * 
 * @see https://en.wikipedia.org/wiki/Binary_tree
 * @see https://en.wikipedia.org/wiki/AVL_tree
 * @param {Array} arr Array of elements
 */
function AVLTree(arr) {

    if (arr instanceof Array === false || arr.length === 0) {
        throw new Error('Invalid input.');
    }

    // make sure the data is sorted
    arr.sort(function(a, b) {
        return a > b ? 1 : -1;
    });

    // preprocessing: remove duplicate elements, but store their number
    var count = {};
    for (var i = 0; i < arr.length; i++) {
        if (!count[arr[i]]) {
            count[arr[i]] = 0;
        }

        count[arr[i]]++;

        if (count[arr[i]] > 1) {
            arr.splice(i, 1);
            i--;
        }
    }

    function createNode(subarr, parent) {

        if (subarr.length === 0) {
            return null;
        }

        if (subarr.length === 1) {
            return new Node(subarr[0], parent)
        }

        var median = Math.floor((subarr.length - 1) / 2),
            medianEl = subarr[median];

        var node = new Node(medianEl, parent),
            left = createNode.call(this, subarr.slice(0, median), node),
            right = createNode.call(this, subarr.slice(median + 1), node);

        node.count = count[medianEl];
        node.left = left;
        node.right = right;
        node.height = 1 + Math.max(this._height(left), this._height(right));

        return node;
    }

    // generate initial binary search tree
    this.root = createNode.call(this, arr);
}

/**
 * Inserts new element into the tree.
 * @param  {any} data Data to insert
 */
AVLTree.prototype.insert = function(data) {

    var cur = this.root,
        prev = null;

    //debugger;

    // find the best position for the new element
    while (cur) {

        prev = cur;
        if (cur.data > data) {
            cur = cur.left;
        } else if (cur.data < data) {
            cur = cur.right;
        } else if (cur.data === data) {
            cur.count++;

            // no need to update heights or rebalance the tree - no new nodes added
            return;
        }
    }

    var node = new Node(data, prev);
    if (prev.data >= data) {
        prev.left = node;
    } else {
        prev.right = node;
    }

    this.rebalance(node.parent);
};

/**
 * Deletes the element from the tree.
 * @param {any} data Data to delete
 */
AVLTree.prototype.delete = function(data) {

    var cur = this.root,
        branch = null;

    function getMin(node) {

        var min = node;

        while (node.left) {
            min = node.left;
            node = node.left;
        }

        return min;
    }

    while (cur) {

        if (cur.data === data) {

            var parent;
            
            if (!cur.left && !cur.right) {

                // a. if node doesn't have any children
                if (cur.parent) {
                    cur.parent[branch] = null;
                }
                parent = cur.parent;
                cur.parent = null;
            } else if (cur.left && !cur.right) {

                // b. if node has only one child
                if (cur.parent) {
                    cur.parent[branch] = cur.left;
                }
                cur.left.parent = cur.parent;
                cur = cur.parent;
                parent = cur;
            } else if (cur.right && !cur.left) {

                // b. if node has only one child
                if (cur.parent) {
                    cur.parent[branch] = cur.right;
                }
                cur.right.parent = cur.parent;
                cur = cur.parent;
                parent = cur;
            } else {

                // c. if node has two children - replace it with a minimum from the right subtree
                var min = getMin(cur.right),
                    minData = min.data;

                this.delete(minData);
                cur.data = minData;
                parent = cur;
            }

            this.rebalance(parent);
            return;
        }

        if (data < cur.data) {
            branch = 'left';
        } else {
            branch = 'right';
        }

        cur = cur[branch];
    }
};

/**
 * Rebalances the subtree to satisft AVL tree definition.
 * @param  {Node} node Subtree root
 */
AVLTree.prototype.rebalance = function(node) {

    while (node) {
        node.height = 1 + Math.max(this._height(node.left), this._height(node.right));

        // rotate subtree if necessary
        var balanceFactor = this._balanceFactor(node);
        if (balanceFactor > 1 && this._balanceFactor(node.left) >= 0) {
            this._rotateRight(node);
        } else if (balanceFactor < -1 && this._balanceFactor(node.right) <= 0) {
            this._rotateLeft(node);
        } else if (balanceFactor > 1 && this._balanceFactor(node.left) < 0) {
            this._rotateLeft(node.left);
            this._rotateRight(node);
        } else if (balanceFactor < -1 && this._balanceFactor(node.right) > 0) {
            this._rotateRight(node.right);
            this._rotateLeft(node);
        }

        node = node.parent;
    }
};

/**
 * Generates string representation of the tree.
 * @return {String}
 */
AVLTree.prototype.pretty = function() {

    var maxLevel = 0;

    // calculate each node position in DFS and their vertical level
    function prepare(node, level) {
        
        var nodes = [];

        if (node) {
            if (level > maxLevel) {
                maxLevel = level;
            }

            nodes = nodes.concat(prepare(node.left, level + 1));

            nodes.push({
                node: node,
                level: level
            });

            nodes = nodes.concat(prepare(node.right, level + 1));
        }

        return nodes;
    }

    var nodes = prepare(this.root, 0),
        res = Array(maxLevel + 1).fill(''),
        offset = 0;

    for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i],
            prettyNode = node.node.pretty();

        prettyNode = '  ' + prettyNode + '  ';

        for (var j = 0; j <= maxLevel; j++) {
            if (j === node.level) {
                res[j] += prettyNode;
            } else {
                // fill the space with whitespaces
                res[j] += Array(prettyNode.length).fill(' ').join('');
            }
        }
    }

    return res.join('\n');
};


/**
 * Helper function. Returns height of the node.
 * @param  {Node} node
 * @return {Number}
 */
AVLTree.prototype._height = function(node) {
    return node ? node.height : -1;
};

/**
 * Helper function. Returns balance factor of the node.
 * Balance factor of the node is a difference between the height of the left and right subtrees.
 * Balance factor should stay between [-1, 1] in order to keep the tree balanced.
 * @param  {Node} node
 * @return {Number}
 */
AVLTree.prototype._balanceFactor = function(node) {
    return node ? this._height(node.left) - this._height(node.right) : 0;
};

/**
 * Helper function. Performs left subtree rotation, updates nodes' heights.
 * @param  {Node} node Subtree root
 */
AVLTree.prototype._rotateLeft = function(node) {

    var parent = node.parent;
    node.parent = node.right;
    node.right = node.parent.left;
    node.parent.left = node;
    node.parent.parent = parent;

    if (node.parent.parent) {
        if (node.parent.data > node.parent.parent.data) {
            node.parent.parent.right = node.parent;
        } else {
            node.parent.parent.left = node.parent;
        }
    }

    if (node.data === this.root.data) {
        this.root = node.parent;
    }

    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
    node.parent.height = 1 + Math.max(this._height(node.parent.left), this._height(node.parent.right));
};

/**
 * Helper function. Performs right subtree rotation, updates nodes' heights.
 * @param  {Node} node Subtree root
 */
AVLTree.prototype._rotateRight = function(node) {

    var parent = node.parent;
    node.parent = node.left;
    node.left = node.parent.right;
    node.parent.right = node;
    node.parent.parent = parent;

    if (node.parent.parent) {
        if (node.parent.data > node.parent.parent.data) {
            node.parent.parent.right = node.parent;
        } else {
            node.parent.parent.left = node.parent;
        }
    }

    if (node.data === this.root.data) {
        this.root = node.parent;
    }

    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
    node.parent.height = 1 + Math.max(this._height(node.parent.left), this._height(node.parent.right));
};
