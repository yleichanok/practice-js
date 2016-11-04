/**
 * Sorts an array in ascending order using Shell sort.
 * @see https://en.wikipedia.org/wiki/Shellsort
 *
 * Average time complexity: depends on the gap sequence.
 */
Array.prototype.shellSort = function(gaps) {

    // exit if nothing to sort
    if (this.length <= 1) {
        return;
    }

    var gaps = [701, 301, 132, 57, 23, 10, 4, 1];

    for (var i = 0; i < gaps.length; i++) {
        var gap = gaps[i];

        for (var j = gap; j < this.length; j++) {

            var tmp = this[j];
            for (var k = j; k >= gap && this[k - gap] > tmp; k -= gap) {
                this[k] = this[k - gap];
            }

            this[k] = tmp;
        }
    }
};