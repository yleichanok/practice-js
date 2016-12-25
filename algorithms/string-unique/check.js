/**
 * Checks if string contains only unique characters.
 * @param  {String} text Input string
 * @return {Boolean}
 */
function check1(text) {

    if (typeof text !== 'string') {
        throw new Error('Text is missing.');
    }

    for (var i = 0, l = text.length; i < l; i++) {
        
        var j = i + 1;

        while (j < l) {

            // found duplicated character - return false
            if (text[j] === text[i]) {
                return false;
            }
            j++;
        }
    }

    return true;
}

/**
 * Another implementation with running time O(n), but using additional data structure.
 * @param  {String} text Input string
 * @return {Boolean}
 */
function check2(text) {

    if (typeof text !== 'string') {
        throw new Error('Text is missing.');
    }

    var freq = {};

    for (var i = 0, l = text.length; i < l; i++) {

        // count all unique characters
        if (!freq[text[i]]) {
            freq[text[i]] = 0;
        }
        freq[text[i]]++;

        // if more than one - return false
        if (freq[text[i]] > 1) {
            return false;
        }
    }

    return true;
}
