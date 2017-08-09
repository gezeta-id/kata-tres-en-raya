var Cell = require('./cell');
var Board = require('./board');
var mtx = require('../util/math');

var players = Cell.players;

function isWinnerCombination(combination) {
    return combination.reduce(function(k,c) { return k + c.w; },0) === 15;
}
function hasWinnerMove(cells) {
    return mtx.combinations(cells, 3).some(isWinnerCombination);
}
function noMoreEmptyCells(table) {
    return table.cells(Cell.EMPTY).length === 0;
}
function check(table, player) {
    var myCells = table.cells(player);
    return hasWinnerMove(myCells);
}
var to3x3 = mtx.toMatrix(3);

function Game() {
    var table;
    var turn;
    this.status = Game.STATUS.UNINITIALIZED;

    this.start = function() {
        table = new Board();
        turn = 0;
        this.status = Game.STATUS.PLAYING;
    };

    this.play = function(x, y) {
        if(this.status === Game.STATUS.UNINITIALIZED) {
            throw new Error('Game hasn\'t been initialized yet.');
        } else if(this.status === Game.STATUS.ENDED) {
            return this;
        }
        //if(!table.empty(x, y)) { return this; }

        table.play(x, y, players[turn]);

        if (!check(table, players[turn])) {
            turn = 1 - turn;
        } else {
            this.status = Game.STATUS.ENDED;
            this.winner = players[turn];
            return this;
        }
        if(noMoreEmptyCells(table)) {
            this.status = Game.STATUS.ENDED;
            this.winner = Game.STATUS.TIE;
            return this;
        }
        return this;
    };
    this.getBoard = function() {
        return to3x3(table.board.map(function(c) { return c.m; }));
    };
    this.turn = function() { return Cell.players[turn]; };
}

Game.STATUS = { UNINITIALIZED: 0, PLAYING: 1, ENDED: 2, TIE: 3 };

module.exports = Game;
