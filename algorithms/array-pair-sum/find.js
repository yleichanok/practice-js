/**
 * Returns all pairs of numbers whose sum is equal to the given one.
 * This implementation has running time of O(n), but space complexity of O(n).
 * 
 * @param  {Array} arr  Input numbers
 * @param  {Number} sum Target sum
 * @return {Array}      Array of pairs
 */
function findPairs1(arr, sum) {

    if (arr instanceof Array === false || typeof sum !== 'number') {
        throw new Error('Invalid input.');
    }

    var res = [],
        pending = []; // storage for previous numbers

    for (var i = 0, l = arr.length; i < l; i++) {

        var num = sum - arr[i],
            index = pending.indexOf(num);

        // if the required number appeared before - return pair
        if (index > -1) {
            res.push([pending[index], arr[i]]);
            pending.splice(index, 1);
        } else {

            // otherwise - add number to pending list
            pending.push(arr[i]);
        }
    }

    return res;
}

/**
 * Another implementation - running time is O(n) (plus sorting) and space is O(1).
 * NOTE: returns pairs in different order.
 */
function findPairs2(arr, sum) {

    if (arr instanceof Array === false || typeof sum !== 'number') {
        throw new Error('Invalid input.');
    }

    arr.sort();

    var res = [];

    for (var i = 0, j = arr.length - 1; i < j;) {
        
        // go through the sorted array from both sides
        // if the sum is bigger than needed - decrease tail index,
        // if smaller - increase front index
        var curSum = arr[i] + arr[j];
        if (curSum === sum) {
            res.push([arr[i], arr[j]]);
            i++;
            j--;
        } else if (curSum > sum) {
            j--;
        } else {
            i++;
        }
    }

    return res;
}
