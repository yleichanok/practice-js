/**
 * Binary search tree data structure. Represented using linked list.
 * Each node has 'count' property to handle duplicates.
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
            left = createNode(subarr.slice(0, median), node),
            right = createNode(subarr.slice(median + 1), node);

        node.count = count[medianEl];
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
