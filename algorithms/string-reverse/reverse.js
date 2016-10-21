/**
 * Returns a reversed string.
 *
 * In Javascirpt strings are immutable,
 * so I have to use an array for building a reversed string.
 * 
 * @param  {String} text Initial string
 * @return {String}
 */
function reverse(text) {

    if (typeof text !== 'string') {
        throw new Error('Text is missing.');
    }

    var len = text.length,
        reversed = new Array(len);

    for (var i = 0, l = len / 2; i < l; i++) {
        reversed[i] = text[len - 1 - i];
        reversed[len - 1 - i] = text[i];
    }
    
    return reversed.join('');
}