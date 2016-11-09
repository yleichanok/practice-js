/**
 * Sorts an array in ascending order using comb sort.
 * @see https://en.wikipedia.org/wiki/Comb_sort
 *
 * Algorithm: compares pairs of elements separated by N other elements (N = gap)
 * until the array is not sorted. Gap is decreased by shrink factor after every pass.
 *
 * Running time: less than O(n^2).
 * 
 * @return {[type]} [description]
 */
Array.prototype.combSort = function() {

    // exit if nothing to sort
    if (this.length <= 1) {
        return;
    }

    var gap = this.length,
        shrink = 1.3,
        swapped;

    while (gap > 1 || swapped) {

        gap = Math.floor(gap / shrink);
        swapped = false;

        for (var i = 0; i + gap < this.length; i++) {

            if (this[i] > this[i + gap]) {
                [this[i], this[i + gap]] = [this[i + gap], this[i]];
                swapped = true;
            }
        }
    }
};
