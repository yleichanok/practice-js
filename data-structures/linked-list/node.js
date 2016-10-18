/**
 * Generic node data structure for linked lists.
 * @param {any}  data Node data
 * @param {Node} next Next node in the list
 * @param {Node} prev Previous node in the list (optional)
 */
function Node(data, next, prev) {
    this.data = data;
    this.next = next || null;
    this.prev = prev || null;
}