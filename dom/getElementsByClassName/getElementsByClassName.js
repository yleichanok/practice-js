/**
 * Returns all child elements by css class names.
 * @param  {String} names             Css class names, space separated
 * @param  {Element|Document} context Root element (optional)
 * @return {Array}
 */
function getElementsByClassName(names, context) {

    if (typeof names !== 'string' || names === '') {
        throw new Error('Invalid input.');
    }
    if (context && context instanceof Document === false && context instanceof Element === false) {
        throw new Error('Invalid context.');
    }

    // use document as a default context
    if (!context) {
        context = document;
    }

    var namesArr = names.split(' '),
        res = [];

    for (var i = 0, l = context.children.length; i < l; i++) {
        
        var child = context.children[i],
            fits = true;

        // check if elements has all class names provided
        for (var j = 0; j < namesArr.length; j++) {
            if (!child.classList.contains(namesArr[j])) {
                fits = false;
                break;
            }
        }
        if (fits) {
            res.push(child);
        }

        // basic DFS
        res = res.concat(getElementsByClassName(names, child));
    }

    return res;
}
