/**
 * Converts string to integer.
 * @param  {String} s Source string
 * @return {Number}
 */
function atoi(s) {

    var regex = new RegExp('^[-+]?[0-9]*$', 'g');
    if (typeof s !== 'string' || !regex.test(s)) {
        throw new Error('Invalid input.');
    }

    var res = 0,
        flag = null,
        i = 0;

    if (s[0] === '-' || s[0] === '+') {
        flag = s[0];
        i++;
    }
    
    for (l = s.length; i < l; i++) {
        res = res * 10 + parseInt(s[i], 10);
    }

    if (flag === '-') {
        res *= -1;
    }

    return res;
}
