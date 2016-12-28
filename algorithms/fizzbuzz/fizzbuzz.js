/**
 * Returns an array from 1 to n that satisfies this condition:
 * if a number is divisible by 3 - replace it with 'Fizz';
 * if a number is divisible by 5 - replace it with 'Buzz';
 * if a number is divisible by both 3 and 5 - replace it with 'FizzBuzz'.
 * 
 * @param  {Number} n Number of elements.
 * @return {Array}
 */
function fizzbuzz(n) {

    if (typeof n !== 'number' || n < 1) {
        throw new Error('Invalid input.');
    }

    var res = [];
    for (var i = 1; i <= n; i++) {

        var el = '';

        if (i % 3 === 0) {
            el += 'Fizz';
        }
        if (i % 5 === 0) {
            el += 'Buzz';
        }

        if (!el) {
            el = i;
        }

        res.push(el);
    }

    return res;
}
