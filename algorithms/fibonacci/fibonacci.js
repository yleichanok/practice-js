/**
 * Finds nth Fibonacci number (version with F0). Recursive implementation.
 * F(n) = F(n-1) + F(n-2)
 * @see https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * Average time complexity: O(2^n)
 * 
 * @param  {Number} n Target number
 * @return {Number}
 */
function fibonacci1(n) {

    if (typeof n !== 'number' || n < 0) {
        throw new Error('Invalid input.');
    }

    if (n <= 1) {
        return n;
    }

    return fibonacci1(n - 1) + fibonacci1(n - 2);
}

/**
 * Finds nth Fibonacci number without recursion.
 *
 * Average time complexity: O(n)
 * 
 * @param  {Number} n Target number
 * @return {Number}
 */
function fibonacci2(n) {

    if (typeof n !== 'number' || n < 0) {
        throw new Error('Invalid input.');
    }

    if (n <= 1) {
        return n;
    }

    var res = 1,
        a = 0,
        b = 1;

    while (n-- >= 2) {
        b = a;
        a = res;
        res = a + b
    }

    return res;
}

/**
 * Finds nth Fibonacci number using a Binet's formula.
 * @see http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibFormula.html
 *
 * Average time complexity: O(1)
 * 
 * @param  {Number} n Target number
 * @return {Number}
 */
function fibonacci3(n) {

    if (typeof n !== 'number' || n < 0) {
        throw new Error('Invalid input.');
    }

    var fi = (Math.sqrt(5) + 1) / 2;

    // have to use Math.round here because of 
    // http://stackoverflow.com/questions/588004/is-floating-point-math-broken
    return Math.round((Math.pow(fi, n) - (Math.pow(-fi, -n))) / Math.sqrt(5));
}
