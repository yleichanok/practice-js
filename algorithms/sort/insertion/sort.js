/**
 * Sorts the array using insertion sort.
 * @see https://en.wikipedia.org/wiki/Insertion_sort
 *
 * Algorithm: for every element in the array check if it's less than the previous one.
 * If so - move the element back by one position. Repeat if necessary.
 *
 * Running time is O(n^2).
 */
Array.prototype.insertionSort = function() {

    // exit if nothing to sort
    if (this.length <= 1) {
        return;
    }

    for (var i = 1, l = this.length; i < l; i++) {

        var j = i;

        // take every element and insert it in a proper position
        // before going farther
        while (j > 0 && this[j - 1] > this[j]) {

            // cool es6 way to swap variables
            [this[j - 1], this[j]] = [this[j], this[j - 1]];
            j--;
        }
    }
};
