/**
 * Tree node for binary search trees. Supports methods chaining.
 * @param {any} data   Node data
 * @param {Node} parent Parent node (optional for root)
 * @param {Node} left   Left child (optional)
 * @param {Node} right  Right child (optional)
 */
function Node(data, parent, left, right) {

    this.data = data;

    this.parent = parent || null;
    this.left = left || null;
    this.right = right || null;
}
