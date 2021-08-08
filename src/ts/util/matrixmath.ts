function prepend<T>(elem:T, arrays:T[][]):T[][] {
    return arrays.map(function(arr) {
        var a = arr.slice(0);
        a.unshift(elem);
        return a;
    });
}
export function combinations<T>(ary:T[], size:number):T[][] {
    if (size > ary.length) return [];

    if (size > 1) {
        return prepend(ary[0], combinations(ary.slice(1), size-1)).concat(combinations(ary.slice(1), size));
    } else {
        return ary.map(function(elem) { return [elem]; });
    }
}

export function toMatrix<T>(w:number) : Function {
    return function(arr:T[]):T[][] {
        var idx = 0;
        var m = [];
        while (idx < arr.length) { m.push(arr.slice(idx, idx+=w)); }
        return m;
    };
}

export function flatten<T>(m:T[][]):T[] {
    return m.reduce(function(a, b) {
        return a.concat(b);
    }, []);
}

