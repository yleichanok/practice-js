/**
 * Sorts an array in ascending order using bubble sort.
 * @see https://en.wikipedia.org/wiki/Bubble_sort
 */
Array.prototype.bubbleSort = function() {

    if (this.length <= 1) {
        return;
    }

    for (var i = 0, l = this.length; i < l; i++) {

        var swapped = false;

        for (var j = 0; j < l - 1; j++) {
            if (this[j + 1] < this[j]) {
                var tmp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = tmp;
                swapped = true;
            }
        }

        // if no swaps were done - exit, nothing more to sort
        if (!swapped) {
            break;
        }
    }
};