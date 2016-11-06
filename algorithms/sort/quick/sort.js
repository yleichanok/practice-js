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

        var mid = end;

        for (var i = start; i < mid; i++) {
            if (self[i] > self[mid]) {
                self.splice(mid + 1, 0, self.splice(i, 1)[0]);
                mid--;
                i--;
            }
        }

        partition(start, mid - 1);
        partition(mid + 1, end);

    }
    partition(0, this.length - 1);
};
