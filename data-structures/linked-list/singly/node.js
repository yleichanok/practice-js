/**
 * Node structure for singly linked list.
 * @param {any}  data Node data
 * @param {Node} next Pointer to the next node in the list
 */
function Node(data, next, prev) {

    this.data = data;
    this.next = next || null;
}
