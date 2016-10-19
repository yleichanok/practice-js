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

function XORNode(data, id, nextId, prevId) {
    this.data = data;
    this.id = id;

    this._ref = (prevId || 0) ^ (nextId || 0);
}

XORNode.prototype.getNextId = function(prevId) {
    return (prevId || 0) ^ this._ref;
};
XORNode.prototype.getPrevId = function(nextId) {
    return (nextId || 0) ^ this._ref;
};

XORNode.prototype.updateRef = function(nextId, prevId) {
    this._ref = (prevId || 0) ^ (nextId || 0);
};