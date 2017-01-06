/**
 * Finds and returns all subsets of the given set.
 * 
 * Example:
 * [1,2,3] => [[], [1], [2], [3], [1,2], [1,3], [2, 3], [1,2,3]]
 * 
 * @param  {Array} arr Input set
 * @return {Array}
 */
function findSubsets(arr) {

    if (arr instanceof Array === false) {
        throw new Error('Invalid input.');
    }


    var res = [],
        queue = new Queue(),
        startIndex = 0;

    queue.enqueue([]);

    while (!queue.isEmpty()) {

        var s1 = queue.dequeue();
        res.push(s1);

        // to avoid duplicated subsets
        if (s1.length > 0) {
            startIndex = arr.indexOf(s1[s1.length - 1]) + 1;
        }

        for (var i = startIndex, l = arr.length; i < l; i++) {
            var s2 = s1.slice();
            s2.push(arr[i])
            queue.enqueue(s2);
        }
    }

    return res;
}
