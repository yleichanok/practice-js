/**
 * Sorts the array in ascending order using selection sort.
 * @see https://en.wikipedia.org/wiki/Selection_sort
 *
 * Algorithm: find the smallest element in the array and put it as the first one.
 * Repeat for the rest of the array.
 * 
 * Running time is O(n^2).
 */
Array.prototype.selectionSort = function() {

    // exit if nothing to sort
    if (this.length <= 1) {
        return;
    }

    for (var i = 0, l = this.length; i < l; i++) {

        var minIndex = i;

        for (var j = i + 1; j < l; j++) {
            if (this[j] < this[minIndex]) {
                minIndex = j;
            }
        }

        if (i !== minIndex) {
            [this[i], this[minIndex]] = [this[minIndex], this[i]];
        }
    }
};
