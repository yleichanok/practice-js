/**
 * Deep flattens the array.
 * Example: [1,[2, [3]]] => [1,2,3]
 * @return {Array}
 */
Array.prototype.flatten = function() {

    for (var i = 0; i < this.length; i++) {

        if (Array.isArray(this[i])) {
            Array.prototype.splice.apply(this, [i, 1].concat(this[i]));

            // go back one step and check new element
            i--;
        }
    }
};
