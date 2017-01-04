/**
 * Returns maximum difference between two elements;
 * the first element must appear before the second.
 * 
 * Example:
 * [1,5,3,4,2,-7,0,3] => 10 (-7 and 3)
 * [10,3,7,5,1,9,-1,12,24,0,23] => 14 (1 and 15)
 * 
 * @param  {Array} arr Array of numbers
 * @return {Number}
 */
function findMaxDiff(arr) {

    if (arr instanceof Array === false || arr.length < 2) {
        throw new Error('Invalid input.');
    }

    var len = arr.length,
        minEl = arr[0],
        maxDiff = arr[1] - arr[0];

    for (var i = 1; i < len; i++) {
        maxDiff = Math.max(maxDiff, arr[i] - minEl);
        minEl = Math.min(minEl, arr[i]);
    }

    return maxDiff;
}
