/**
 * Pretty prints a json object (and some other data types).
 * @param  {any}    val    Value to print
 * @param  {number} offset Whitespace offset
 * @return {String}
 */
function pretty(val, offset) {

    var offset = offset || '';

    switch (typeof val) {
    case 'number':
        return '' + val;
    case 'string':
        return '"' + val + '"';
    case 'boolean':
        return '' + val;
    case 'object':
        if (val instanceof Array) {
            return prettyArray(val, offset);
        } else {
            return prettyObject(val, offset);
        }
    }

    return 'null';
}

function prettyArray(arr, offset) {

    if (arr.length === 0) {
        return '[]';
    }

    var res = ['['];
    for (var i = 0, l = arr.length; i < l; i++) {
        res.push('\n');
        res.push(offset + '  ');
        res.push(pretty(arr[i], offset + '  '));

        if (i < arr.length - 1) {
            res.push(',');
        }
    }
    res.push('\n');
    res.push(offset);
    res.push(']');

    return res.join('');
}

function prettyObject(obj, offset) {

    if (Object.keys(obj).length === 0) {
        return '{}';
    }

    var res = ['{'];
    for (var key in obj) {
        res.push('\n');
        res.push(offset + '  ');
        res.push('"' + key + '": ');
        res.push(pretty(obj[key], offset + '  '));
        res.push(',');
    }

    res.splice(res.length - 1, 1);
    res.push('\n');
    res.push(offset);
    res.push('}');

    return res.join('');
}
