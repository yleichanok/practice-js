/**
 * Finds and returns the only unique element in the array.
 * Running time is O(n), space complexity O(n).
 * @param  {Array} arr Input array
 * @return {any}
 */
function findUnique(arr) {

    if (arr instanceof Array === false) {
        throw new Error('Invalid input.');
    }

    var dups = [];

    for (var i = arr.length - 1; i >= 0; i--) {

        var el = arr[i],
            isDup = dups.indexOf(el) > -1;

        if (!isDup) {
            if (arr.indexOf(el) === i) {
                return el;
            }

            // store duplicated elements
            dups.push(el);
        }
    }

    return null;
}
