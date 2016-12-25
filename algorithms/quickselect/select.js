/**
 * Selects kth smallest element from a random array.
 * 
 * @param  {Array} arr Input array
 * @param  {Number} k  Index
 * @return {any}       Kth smallest element
 */
function select(arr, k) {

    if (!Array.isArray(arr)) {
        throw new Error('Missing input array.');
    }
    if (k < 0) {
        throw new Error('Missing element index.');
    }

    function partition(start, end) {

        if (start === end) {
            return arr[start];
        }

        var pivot = end;
        for (var i = start; i < end; i++) {
            if (arr[i] > arr[pivot]) {
                arr.splice(pivot + 1, 0, arr.splice(i, 1)[0]);
                i--;
                pivot--;
            }
        }

        if (k === pivot) {
            return arr[pivot];
        } else if (k < pivot) {
            return partition(start, pivot - 1);
        } else {
            return partition(pivot + 1, end);
        }
    }

    return partition(0, arr.length - 1);
}
