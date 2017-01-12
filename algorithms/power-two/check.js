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
