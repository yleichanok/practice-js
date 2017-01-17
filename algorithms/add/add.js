/**
 * Sums two numbers represented by strings.
 * @param  {String} a First number
 * @param  {String} b Second number
 * @return {String}
 */
function add(a, b) {

    if (typeof a !== 'string' || typeof b !== 'string') {
        throw new Error('Invalid input.');
    }

    // make sure that valid numbers are provided
    var regex = new RegExp('^[0-9]*$');
    if (!regex.test(a) || !regex.test(b)) {
        throw new Error('Invalid input.');
    }

    var parts = [],
        storage = 0,
        diffA = 0,
        diffB = 0,
        i;

    if (a.length > b.length) {
        i = a.length - 1;
        diffB = a.length - b.length;
    } else {
        i = b.length - 1;
        diffA = b.length - a.length;
    }

    for (; i >= 0; i--) {
        var numA = parseInt(a[i - diffA] || 0, 10),
            numB = parseInt(b[i - diffB] || 0, 10),
            res = numA + numB + storage;

        parts.push(res % 10);
        storage = (res - (res % 10)) / 10;
    }

    return parts.reverse().join('');
}
