/**
 * Node structure for doubly linked lists.
 * @param {any}  data Node data
 * @param {Node} next Pointer to the next node in the list
 * @param {Node} prev Pointer to the previous node in the list
 */
function Node(data, next, prev) {

    this.data = data;
    this.next = next || null;
    this.prev = prev || null;
}
