/**
 * Returns the most frequent element in the array.
 * In case if there is more than one - returns the last one.
 * @param  {Array} arr Input array
 * @return {any}
 */
function findMostFrequent(arr) {

    if (arr instanceof Array === false || arr.length < 1) {
        throw new Error('Invalid input.');
    }

    var map = {}, // elements counter
        max = 0, // current maximum count
        res = null; // current most frequent element

    for (var i = 0, l = arr.length; i < l; i++) {
        
        var el = arr[i];

        if (!map[el]) {
            map[el] = 0;
        }
        map[el]++;

        if (map[el] >= max) {
            max = map[el];
            res = el;
        }
    }

    return res;
}
