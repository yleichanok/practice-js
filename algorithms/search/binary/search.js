/**
 * Binary search in a sorted array.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Array.prototype.binarySearch = function(data) {

    if (this.length === 0) {
        return -1;
    }

    var self = this;

    function search(start, end) {

        if (end - start === 0) {
            return self[start] === data ? start : -1;
        }

        var middle = Math.floor((start + end) / 2);

        if (data <= self[middle]) {
            return search(start, middle);
        } else {
            return search(middle + 1, end);
        }
    }

    return search(0, this.length - 1);
};
