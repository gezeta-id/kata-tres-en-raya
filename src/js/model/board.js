var Cell = require('./cell.js');

function buildMagicArray() {
    return [6,1,8,7,5,3,2,9,4].map(function(p) { return new Cell(p); });
}
function index(x,y) { return x*3+y; }

function movesFor(player) {
    return function(cell) { return cell.m === player; };
}
function emptyCell(cell) { return cell.m === Cell.EMPTY; }

function Board() {
    var board = buildMagicArray();
    this.empty = function(x, y) {
        var idx = index(x,y);
        if (idx < 0 || idx > 8) throw new Error('Invalid coordinates');
        return !board[idx].m;
    };
    this.play = function(x, y, player) {
        var idx = index(x,y);
        if (idx < 0 || idx > 8) throw new Error('Invalid coordinates');
        if (!Cell.players.includes(player)) throw new Error('Invalid player');
        board[idx] = board[idx].mark(player);
        return this;
    };
    this.cells = function(player) {
        if (!player) {
            return board.filter(emptyCell);
        } else {
            if (!Cell.players.includes(player)) throw new Error('Invalid player');
            return board.filter(movesFor(player));
        }
    }
    Object.defineProperty(this, 'board', {
        get: function() {
            return board.slice(0);
        }
    });
}

module.exports = Board;
