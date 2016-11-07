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
function convert1(s, rows) {

    if (typeof s !== 'string') {
        throw new Error('Invalid input.');
    }
    if (rows <= 0) {
        throw new Error('Invalid number of rows.');
    }

    if (s.length < 3) {
        return s;
    }

    // create an array of N arrays, where N == rows
    // to store letters in each row
    var res = Array.from({length: rows}, () => []),
        increment = 1,
        row = 0;

    for (var i = 0, l = s.length; i < l; i++) {

        res[row].push(s[i]);

        // check if we need to go backwards
        if (row === rows - 1 && increment > 0) {
            increment = -1;
        } else if (row === 0 && increment < 0) {
            increment = 1;
        }

        // set next row index
        row += increment;
    }

    // merge arrays into one
    return [].concat.apply([], res).join('');
}

/**
 * Probably a better implementation. Uses only one array for the result string.
 * 
 * @param  {String} s    Initial string
 * @param  {Number} rows Number of rows
 * @return {String}      Result string
 */
function convert2(s, rows) {

    if (typeof s !== 'string') {
        throw new Error('Invalid input.');
    }
    if (rows <= 0) {
        throw new Error('Invalid number of rows.');
    }

    if (s.length < 3) {
        return s;
    }

    var res = new Array(s.length),
        step = 2 * rows - 2;

    for (var i = 0; i < rows; i++) {

        if (i === 0 || i === rows - 1) {

            // every Nth letter goes in the first or last row
            // where N == step
            for (var j = i; j < s.length; j += step) {
                res.push(s[j]);
            }
        } else {

            // magic formula for to find a step for letters in other rows;
            // step is alternating
            var step1 = 2 * (rows - 1 - i),
                step2 = step - step1,
                back = false;

            for (var j = i; j < s.length;) {
                res.push(s[j]);

                if (back) {
                    j += step2;
                } else {
                    j += step1;
                }

                back = !back;
            }
        }
    }

    return res.join('');
}
