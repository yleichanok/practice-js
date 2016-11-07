/**
 * Checks if the given string is a palyndrome.
 * Ignores any characters except alphanumeric.
 * 
 * @param  {String}  s Initial string
 * @return {Boolean}   Result
 */
function isPalyndrome(s) {

    if (typeof s !== 'string') {
        throw new Error('Invalid input.');
    }

    if (s.length <= 1) {
        return true;
    }

    for (var i = 0, j = s.length - 1; i < j;) {

        var left = s[i],
            right = s[j];

        // get next alphanumeric character,
        // ignore all others
        while (i < j) {
            if (isAlphanumeric(left) && isAlphanumeric(right)) {
                break;
            }

            if (!isAlphanumeric(left)) {
                i++;
                left = s[i];
            }
            if (!isAlphanumeric(right)) {
                j--;
                right = s[j];
            }
        }

        // no need to go to the end of the string
        if (left.toLowerCase() !== right.toLowerCase()) {
            return false;
        }

        i++;
        j--;
    }

    return true;
}

function isAlphanumeric(c) {

    return c.match(/^\w{1}$/gi);
}
