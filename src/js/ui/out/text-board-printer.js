function c(x) { return x||' '; }

function render(matrix) {
    var r = matrix.reduce(function(k,r,i) {
        k.push(String(i+1)+ ' ' +r.map(c).join('│')+'\n');
        return k;
    }, []).join('  ─┼─┼─\n');
    return '  A B C\n       \n'+r;
}

module.exports = render;
