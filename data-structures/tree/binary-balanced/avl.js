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

    // find the best position for the new element
    while (cur) {

        prev = cur;
        if (cur.data > data) {
            cur = cur.left;
        } else if (cur.data < data) {
            cur = cur.right;
        } else if (cur.data === data) {
            cur.count++;
            return;
        }
    }

    var node = new Node(data, prev);
    if (prev.data >= data) {
        prev.left = node;
    } else {
        prev.right = node;
    }

    // update node heights
    var parent = node.parent;
    while (parent) {
        parent.height = 1 + Math.max(this._height(parent.left), this._height(parent.right));
        parent = parent.parent;
    }
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
            
            if (!cur.left && !cur.right) {

                // a. if node doesn't have any children
                if (cur.parent) {
                    cur.parent[branch] = null;
                }
                cur.parent = null;
            } else if (cur.left && !cur.right) {

                // b. if node has only one child
                if (cur.parent) {
                    cur.parent[branch] = cur.left;
                }
                cur.left.parent = cur.parent;
                cur = cur.parent;
            } else if (cur.right && !cur.left) {

                // b. if node has only one child
                if (cur.parent) {
                    cur.parent[branch] = cur.right;
                }
                cur.right.parent = cur.parent;
                cur = cur.parent;
            } else {

                // c. if node has two children - replace it with a minimum from the right subtree
                var min = getMin(cur.right),
                    minData = min.data;

                this.delete(minData);
                cur.data = minData;
            }

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
 * @param  {Node} node
 * @return {Number}
 */
AVLTree.prototype._balanceFactor = function(node) {
    return node ? this._height(node.left) - this._height(node.right) : 0;
};
