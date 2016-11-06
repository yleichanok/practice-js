/**
 * Sorts an array in ascending order using quick sort.
 * @see https://en.wikipedia.org/wiki/Quicksort
 *
 * Algorithm: select a 'pivot' element (in this implementation - the last one).
 * For every element except the pivot check if it's less or greater than the pivot.
 * If less - move it before the pivot, if greater - after the pivot.
 * Repeat for two subarrays - before the pivot and after.
 *
 * Running time is O(n log n).
 */
Array.prototype.quickSort = function() {
    
    // exit if nothing to sort
    if (this.length <= 1) {
        return;
    }

    var self = this;

    function partition(start, end) {

        if (start >= end) {
            return;
        }

        var j = end;

        for (var i = start; i < j; i++) {
            if (self[i] > self[j]) {
                self.splice(j + 1, 0, self.splice(i, 1)[0]);
                j--;
                i--;
            }
        }

        partition(start, j - 1);
        partition(j + 1, end);

    }
    partition(0, this.length - 1);
};
