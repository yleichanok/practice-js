/**
 * Converts a given string into another string, that can be written
 * in a zigzag patters:
 * 
 * 'PAYPALISHIRING' -> 'PAHNAPLSIIGYIR'
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * @see http://www.programcreek.com/2014/05/leetcode-zigzag-conversion-java/
 * 
 * @param  {String} s    Initial string
 * @param  {Number} rows Number of rows to use
 * @return {String}      Result string
 */
function convert(s, rows) {

    if (typeof s !== 'string') {
        throw new Error('Invalid input.');
    }
    if (rows <= 0) {
        throw new Error('Invalid number of rows.');
    }

    if (s.length < 3) {
        return s;
    }

    // create array of N arrays, where N == rows
    // to store letters in each row
    var res = Array.from({length: rows}, () => []),
        increment = 1,
        row = 0;

    for (var i = 0, l = s.length; i < l; i++) {

        res[row].push(s[i]);

        if (row === rows - 1 && increment > 0) {
            increment = -1;
        } else if (row === 0 && increment < 0) {
            increment = 1;
        }

        row += increment;
    }

    // merge arrays into one
    return [].concat.apply([], res).join('');
}
