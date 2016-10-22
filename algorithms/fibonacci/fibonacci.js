/**
 * Finds nth Fibonacci number (version with F0). Recursive implementation.
 * F(n) = F(n-1) + F(n-2)
 * @see https://en.wikipedia.org/wiki/Fibonacci_number
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
