function prepend(elem, arrays) {
    return arrays.map(function(arr) {
        var a = arr.slice(0);
        a.unshift(elem);
        return a;
    });
}
function combinations(ary, size) {
    if (size > ary.length) return [];
    if (size > 1) {
        return prepend(ary[0], combinations(ary.slice(1), size-1)).concat(combinations(ary.slice(1), size));
    } else {
        return ary.map(function(elem) { return [elem]; });
    }
}

function toMatrix(w) {
    return function(arr) {
        var idx = 0;
        var m = [];
        while (idx < arr.length) { m.push(arr.slice(idx, idx+=w)); }
        return m;
    };
}

module.exports =  {
    combinations: combinations,
    toMatrix: toMatrix
};
