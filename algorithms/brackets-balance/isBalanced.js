/**
 * Checks if brackets in the input text are balanced.
 *
 * If the bracket is opening - push it to the stack;
 * if the bracket is closing - check the value in the stack:
 *     if it is a corresponding opening bracket - remove it from the stack.
 * Stack has to end up empty.
 * 
 * @param  {String} text Text to check
 * @return {Boolean}
 */
function isBalanced(text) {

    if (typeof text !== 'string') {
        throw new Error('Text is missing.');
    }

    var pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    var stack = new Stack(text.length);

    for (var i = 0, l = text.length; i < l; i++) {
        var char = text[i];
        switch(char) {
        case '(':
        case '{':
        case '[':
            stack.push(char);
            break;
        case ')':
        case '}':
        case ']':
            if (stack.isEmpty()) {
                return false;
            }

            var previous = stack.pop();
            if (!previous || previous !== pairs[char]) {
                return false;
            }
            break;
        }
    }

    return stack.isEmpty();
}
