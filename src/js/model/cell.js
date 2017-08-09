function valid(mark) {
    return (!mark || Cell.players.includes(mark));
}

function Cell(weight,mark) {
    if (!valid(mark)) throw new Error("Only X's and O's. -" + mark + "-");
    Object.defineProperty(this, 'w', {
        get: function() { return weight; }
    });
    Object.defineProperty(this, 'm', {
        get: function() { return mark; },
    });
}

Cell.prototype.mark = function(m) {
    if (!valid(m)) throw new Error("Only X's and O's. -" + m + "-");
    return new Cell(this.w, m);
}

Cell.EMPTY = undefined;
Cell.players = ['X', 'O'];

Object.freeze(Cell);
module.exports = Cell;
