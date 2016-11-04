/**
 * Sorts an array using merge sort.
 * @see https://en.wikipedia.org/wiki/Merge_sort
 *
 * Average time complexity: O(n log n)
 */
Array.prototype.mergeSort1 = function() {
    
    // exit if nothing to sort
    if (this.length <= 1) {
        return;
    }

    var pivot = Math.floor((this.length - 1) / 2),
        arr1 = this.slice(0, pivot + 1),
        arr2 = this.slice(pivot + 1);

    // split initial array into small subarrays
    arr1.mergeSort1();
    arr2.mergeSort1();

    var i = 0;

    // merge subarrays into one
    while (arr1.length || arr2.length) {

        if (arr1.length && (!arr2.length || arr1[0] < arr2[0])) {
            this[i] = arr1[0];
            arr1.splice(0, 1);
        } else if (arr2.length && (!arr1.length || arr1[0] >= arr2[0])) {
            this[i] = arr2[0];
            arr2.splice(0, 1);
        }

        i++;
    }
};

/**
 * Sorts an array using merge sort.
 * This implementation is index-based and uses only one temporary array.
 */
Array.prototype.mergeSort2 = function() {

    // exit if nothing to sort
    if (this.length <= 1) {
        return;
    }

    var self = this,
        arr = new Array(this.length);

    function merge(start, middle, end) {

        var i = start, j = middle + 1;

        for (var k = start; k <= end; k++) {
            if (i <= middle && (j > end || self[i] < self[j])) {
                arr[k] = self[i];
                i++;
            } else {
                arr[k] = self[j];
                j++;
            }
        }
    }

    function split(start, end) {

        if (start >= end) {
            return;
        }

        // split array into smaller subarrays
        var middle = Math.floor((end + start) / 2);
        split(start, middle);
        split(middle + 1, end);

        // then merge them in order
        merge(start, middle, end);

        // copy from temp array to the initial
        for (var i = start; i <= end; i++) {
            self[i] = arr[i];
        }
    }

    split(0, this.length - 1);
};
