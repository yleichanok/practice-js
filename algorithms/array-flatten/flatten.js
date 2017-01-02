/**
 * Deep flattens the array.
 * Example: [1,[2, [3]]] => [1,2,3]
 * @return {Array}
 */
Array.prototype.flatten = function() {

    for (var i = 0; i < this.length; i++) {

        if (Array.isArray(this[i])) {

            this[i].flatten();

            var len = this[i].length;
            Array.prototype.splice.apply(this, [i, 1].concat(this[i]));
            i += len - 1;
        }
    }
};
