/**
 * Sorts an array in ascending order using quick sort.
 * @see https://en.wikipedia.org/wiki/Quicksort
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
