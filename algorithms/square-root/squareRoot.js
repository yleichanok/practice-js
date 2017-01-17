/**
 * Finds a positive square root of a number.
 * @param  {Number} num       Target number
 * @param  {Number} precision Max error.
 * @return {Number}
 */
function squareRoot(num, precision) {

    if (typeof num !== 'number' || num < 0) {
        throw new Error('Invalid input.');
    }

    precision || (precision = 0.0001);

    var start = 0,
        end = num,
        res;

    while (end - start > precision) {
        
        res = (start + end) / 2;

        var total = res * res;
        if (total === num) {
            break;
        }

        if (total > num) {
            end = res;
        } else {
            start = res;
        }
    }

    res = Math.round(res / precision) * precision;

    return res;
}
