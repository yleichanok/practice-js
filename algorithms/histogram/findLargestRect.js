/**
 * Finds and returns the largest rectangle in histogram.
 * Example:
 *
 * [1,3,2,1,2] => 5
 *    __
 *    || __    __
 * __ || || __ ||
 * || || || || ||
 * --------------
 * 
 * @param  {Array} arr Rectangles heights.
 * @return {Number}
 */
function findLargestRect(arr) {

    if (arr instanceof Array === false || arr.length === 0) {
        throw new Error('Invalid input.');
    }

    var largest = 0,
        indices = [],
        values = [];

    for (var i = 0, l = arr.length; i < l; i++) {
        if (values.length === 0 || values[values.length - 1] < arr[i]) {
            indices.push(i);
            values.push(arr[i]);
        } else {

            var firstIndex = i;

            while (values[values.length - 1] >= arr[i]) {

                var potentialLargest = values[values.length - 1] * (i - indices[indices.length - 1]);
                if (potentialLargest > largest) {
                    largest = potentialLargest;
                }

                values.pop();
                firstIndex = indices.pop();
            }

            indices.push(firstIndex);
            values.push(arr[i]);
        }
    }

    var j = values.length - 1;
    while (j >= 0) {

        var potentialLargest = values[j] * (arr.length - indices[j]);
        if (potentialLargest > largest) {
            largest = potentialLargest;
        }
        j--;
    }

    return largest;
}
