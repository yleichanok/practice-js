/**
 * Checks if the given string is a palyndrome.
 * Ignores any characters except alphanumeric.
 * 
 * @param  {String}  s Initial string
 * @return {Boolean}   Result
 */
function isPalyndrome1(s) {

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

/**
 * Another implementation - removes all non-alphanumeric characters from the string
 * as the first step.
 * 
 * @param  {String}  s String to check
 * @return {Boolean}   Resule
 */
function isPalyndrome2(s) {

    if (typeof s !== 'string') {
        throw new Error('Invalid input.');
    }

    // first, remove all non-alphanumeric characters
    s = s.replace(/\W/gi, '');

    if (s.length <= 1) {
        return true;
    }

    // then, check characters on both sides of the string
    for (var i = 0, mid = (s.length - 1) / 2; i <= mid; i++) {

        if (s[i].toLowerCase() !== s[s.length - 1 - i].toLowerCase()) {
            return false;
        }
    }

    return true;
}

function isAlphanumeric(c) {
    return c.match(/^\w{1}$/gi);
}
