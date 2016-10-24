/**
 * Parses a mathematical expression in infox notation,
 * and converts it to postfix ("reverse polish") notation.
 * @see https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 * 
 * @param  {String} expr Expression
 * @return {Number}
 */
function parse(expr) {

    var regex = new RegExp('[0-9 +-/\*]', 'g');

    // test input to contain only digits and basic mathematical operations
    if (typeof expr !== 'string' || !regex.test(expr) || !isBalanced(expr)) {
        throw new Error('Invalid input.');
    }

    var opsPrecedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    var s = new Stack(),
        q = new Queue(),
        tokens = expr.split(/\s+/g),
        token;

    while (token = tokens.shift()) {

        var num = parseFloat(token);

        if (!isNaN(num)) {

            // if token is a number - push it to the queue
            q.enqueue(num);
        } else if (token === '(') {

            // if token is a left parenthesis - push it to the operator stack
            s.push(token);
        } else if (token === ')') {

            // if token is a right parenthesis - 
            // until the token at the top of the stack is a left parenthesis
            // pop operators from the stack to the queue
            while (s.peek() !== '(' && s.size() > 0) {
                q.enqueue(s.pop());
            }

            // remove the left parenthesis from the stack
            s.pop();
        } else {

            // if token is an operator - 
            // while there is an operator at the top of the stack
            // which precedence is more or equal to the token precedence
            // pop it from the stack to the queue
            while (['+', '-', '*', '/'].indexOf(s.peek()) > -1) {
                if (opsPrecedence[token] <= opsPrecedence[s.peek()]) {
                    q.enqueue(s.pop());
                } else {
                    break;
                }
            }

            // push the token to the stack
            s.push(token);
        }
    }

    // push remaining operators to the queue
    while (!s.isEmpty()) {
        q.enqueue(s.pop());
    }

    return q.toArray().join(' ');
}
