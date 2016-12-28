/**
 * Binary search tree data structure. Represented using linked list.
 * Duplicate elements are allowed, duplicates go to the left tree.
 * 
 * @see https://en.wikipedia.org/wiki/Binary_tree
 * @param {Array} arr Array of elements
 */
function Tree(arr) {

    if (arr instanceof Array === false || arr.length === 0) {
        throw new Error('Invalid input.');
    }

    // make sure the data is sorted
    arr.sort(function(a, b) {
        return a > b ? 1 : -1;
    });

    function createNode(subarr, parent) {

        if (subarr.length === 0) {
            return null;
        }

        if (subarr.length === 1) {
            return new Node(subarr[0], parent)
        }

        var median = Math.floor((subarr.length - 1) / 2),
            node = new Node(subarr[median], parent);

        var left = createNode(subarr.slice(0, median), node),
            right = createNode(subarr.slice(median + 1), node);

        node.left = left;
        node.right = right;

        return node;
    }

    // generate initial binary search tree
    this.root = createNode(arr);
}

/**
 * Inserts new element into the tree.
 * @param  {any} data Data to insert
 */
Tree.prototype.insert = function(data) {

    var cur = this.root,
        prev = null;

    // find the best position for the new element
    while (cur) {

        prev = cur;
        if (cur.data >= data) {
            cur = cur.left;
        } else if (cur.data < data) {
            cur = cur.right;
        }
    }

    var node = new Node(data, prev);
    if (prev.data >= data) {
        prev.left = node;
    } else {
        prev.right = node;
    }  
};

/**
 * Deletes the element from the tree.
 * @param {any} data Data to delete
 */
Tree.prototype.delete = function(data) {

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
            } else if (cur.right && !cur.left) {

                // b. if node has only one child
                if (cur.parent) {
                    cur.parent[branch] = cur.right;
                }
                cur.right.parent = cur.parent;
            } else {

                // c. if node has two children - replace it with a minimum from the right subtree
                var min = getMin(cur.right),
                    minData = min.data;

                this.delete(minData);
                cur.data = minData;
            }

            return;
        }

        if (data > cur.data) {
            branch = 'right';
        } else {
            branch = 'left';
        }

        cur = cur[branch];
    }

    // looked through all nodes, element not found
    throw new Error('Not found.');
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
            cur = cur.left;
        } else if (cur.data < data) {
            cur = cur.right;
        } else {
            return true;
        }
    }

    return false;
};

/**
 * Checks if the tree is actually a binary search tree:
 * elements in left subtrees are less or equal, and right ones are more than the parent.
 * @return {Boolean}
 */
Tree.prototype.verify = function() {

    var res = 1;

    function verify(node) {

        if (node.parent) {
            if (node.parent.left === node && node.data <= node.parent.data) {
                res &= true;
            } else if (node.parent.right === node && node.data > node.parent.data) {
                res &= true;
            } else {
                res &= false;

                // no need to check children
                return;
            }
        }

        if (node.left) {
            verify(node.left);
        }
        if (node.right) {
            verify(node.right);
        }
    }

    if (this.root) {
        verify(this.root);
    }

    return res === 1;
};

/**
 * Finds the smallest element in the tree.
 * @return {any}
 */
Tree.prototype.min = function() {

    var cur = this.root,
        min = null;

    while (cur) {
        min = cur ? cur.data : null;
        cur = cur.left;
    }

    return min;
};

/**
 * Returns the biggest element in the tree.
 * @return {any}
 */
Tree.prototype.max = function() {

    var cur = this.root,
        max = null;

    while (cur) {
        max = cur ? cur.data : null;
        cur = cur.right;
    }

    return max;
};

/**
 * Calculates the height of the tree.
 * @return {Number}
 */
Tree.prototype.height = function(node) {

    var h = 0;

    if (node) {
        h++;

        var leftHeight = this.height(node.left),
            rightHeight = this.height(node.right);

        if (leftHeight >= rightHeight) {
            h += leftHeight;
        } else {
            h += rightHeight;
        }
    }

    return h;
};
