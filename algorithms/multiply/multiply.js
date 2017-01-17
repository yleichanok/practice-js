/**
 * Multiplies two very big integer numbers.
 * @param  {String} a First number represented by a string
 * @param  {String} b Second number
 * @return {String}   Result
 */
function multiply(a, b) {

    if (typeof a !== 'string' || typeof b !== 'string') {
        throw new Error('Invalid input.');
    }

    // make sure that valid numbers are provided
    var regex = new RegExp('^[0-9]*$');
    if (!regex.test(a) || !regex.test(b)) {
        throw new Error('Invalid input.');
    }

    if (a === '0' || b === '0') {
        return '0';
    }

    var parts = [];

    for (var i = a.length - 1; i >= 0; i--) {

        var storage = 0,
            num = Array(a.length - i - 1).fill('0');

        for (var j = b.length - 1; j >= 0; j--) {
            var numA = parseInt(a[i], 10),
                numB = parseInt(b[j], 10),
                mul = numA * numB + storage;

            num.push(mul % 10);
            storage = (mul - (mul % 10)) / 10;
        }

        if (storage > 0) {
            num.push(storage);
            storage = 0;
        }
        parts.push(num.reverse().join(''));
    }

    var res = parts[0];
    for (var k = 1; k < parts.length; k++) {
        res = add(res, parts[k]);
    }

    return res;
}
