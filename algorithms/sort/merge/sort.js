/**
 * Sorts an array using merge sort.
 * @see https://en.wikipedia.org/wiki/Merge_sort
 *
 * Average time complexity: O(n log n)
 */
Array.prototype.mergeSort = function() {
    
    // exit if nothing to sort
    if (this.length <= 1) {
        return;
    }

    var pivot = Math.floor((this.length - 1) / 2),
        arr1 = this.slice(0, pivot + 1),
        arr2 = this.slice(pivot + 1);

    // split initial array into small subarrays
    arr1.mergeSort();
    arr2.mergeSort();

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
