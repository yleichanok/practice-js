/**
 * Checks if the number is a power of two.
 * @param  {Number} num Input number
 * @return {Boolean}
 */
function check1(num) {

    if (typeof num !== 'number') {
        throw new Error('Invalid input.');
    }

    return num !== 0 && (num & (num - 1)) === 0;
}

/**
 * Different implementation.
 * @param  {Number} num Input number
 * @return {Boolean}
 */
function check2(num) {

    if (typeof num !== 'number') {
        throw new Error('Invalid input.');
    }

    while (num > 1) {
        num /= 2;
    }

    return num === 1;
}
