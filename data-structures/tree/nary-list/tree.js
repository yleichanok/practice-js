/**
 * N-ary tree data structure. Represented using linked list.
 * @see https://en.wikipedia.org/wiki/Tree_(data_structure)
 * @param {any} data Data for the root node
 */
function Tree(data) {

    if (!data) {
        throw new Error('Invalid input.');
    }

    this.root = new Node(data);
}
