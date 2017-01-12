/**
 * Converts an integer into its binary form.
 * @param  {Number} num Input number
 * @return {String}
 */
function convert(num) {

    if (typeof num !== 'number') {
        throw new Error('Invalid input.');
    }

    var res = [];

    while (num > 1) {
        var leftover = num % 2;
        res.splice(0, 0, leftover);
        num = (num - leftover) / 2;
    }

    res.splice(0, 0, num);

    return res.join('');
}
