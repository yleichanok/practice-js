/**
 * Evaluates a mathematical expression written in postfix ("reverse polish") notation.
 * Operators and operands must be separated with whitespaces.
 * @see https://en.wikipedia.org/wiki/Reverse_Polish_notation
 * 
 * @param  {String} expr Expression to evaluate
 * @return {Number}
 */
function evaluate(expr) {

    var regex = new RegExp('[0-9 +-/\*]', 'g');

    // test input to contain only digits and basic mathematical operations
    if (typeof expr !== 'string' || !regex.test(expr)) {
        throw new Error('Invalid input.');
    }

    var s = new Stack(),
        tokens = expr.split(/\s+/g),
        token;

    while (token = tokens.shift()) {

        var num = parseFloat(token);

        // if the token is a number - push it to the stack
        // if it's an operation - pop the last to elements from the stack
        // and perform the operation
        if (!isNaN(num)) {
            s.push(num);
        } else {
            if (s.size() < 2) {
                throw new Error('Invalid input.');
            }

            var op2 = s.pop(),
                op1 = s.pop(),
                res;

            switch (token) {
            case '+':
                s.push(op1 + op2);
                break;
            case '-':
                s.push(op1 - op2);
                break;
            case '*':
                s.push(op1 * op2);
                break;
            case '/':
                s.push(op1 / op2);
                break;
            default:
                throw new Error('Unknown operation: ' + token);
            }
        }
    }

    if (s.size() > 1) {
        throw new Error('Invalid input.');
    }

    return s.pop();
}
