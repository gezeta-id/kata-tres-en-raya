var 
    sinon = require('sinon'),
    expect = require('chai').expect;

var Cell = require('../js/model/cell.js');
var Board = require('../js/model/board.js');
var Game = require('../js/model/game.js');
var mtx = require('../js/util/math');
var to3x3 = mtx.toMatrix(3);

function playSequence(seq, g) {
    seq.forEach(function(m) { g.play(m.x,m.y); });
}
var SEQUENCES = {
    '2 basic turns': [
        {x:0,y:0},
                    {x:1,y:0}
    ],
    'x wins': [
        {x:0,y:0},
                    {x:0,y:1},
        {x:1,y:0},
                    {x:1,y:2},
        {x:2,y:0}
    ],
    'a tie': [
        {x:0,y:0},
                    {x:0,y:1},
        {x:1,y:0},
                    {x:1,y:1},
        {x:2,y:1},
                    {x:2,y:0},
        {x:0,y:2},
                    {x:1,y:2},
        {x:2,y:2}
    ]
};

describe('Game', function () {

    it('...can be created without any further information', function() {
        var g = new Game();
        expect(g).not.to.be.null;
    });

    it('...is uninitialized until you start the game', function() {
        var g = new Game();
        expect(function() { g.play(0,0); }).to.throw;
        g.start();
        expect(function() { g.play(0,0); }).not.to.throw;
    });

    it('...allows moves to be played to alternating players', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['2 basic turns'],g);
        expect(g.getBoard()).to.deep.equal([['X',Cell.EMPTY,Cell.EMPTY],['O',Cell.EMPTY,Cell.EMPTY],[Cell.EMPTY,Cell.EMPTY,Cell.EMPTY]]);
    });

    it('...a game is won when a player gets three pieces in line', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['x wins'],g);
        expect(g.status).to.equal(Game.STATUS.ENDED);
        expect(g.winner).to.equal('X');
    });

    it('...once a game is won, further moves are ignored', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['x wins'],g);
        expect(g.status).to.equal(Game.STATUS.ENDED);
        expect(g.winner).to.equal('X');
        g.play(2,2);
        expect(g.status).to.equal(Game.STATUS.ENDED);
        expect(g.winner).to.equal('X');
    });

    it('...if all cells are used, it\'s a tie', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['a tie'],g);
        expect(g.status).to.equal(Game.STATUS.ENDED);
        expect(g.winner).to.equal(Game.STATUS.TIE);
    });

    it('...once a game is tied, further moves are ignored', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['a tie'],g);
        expect(g.status).to.equal(Game.STATUS.ENDED);
        expect(g.winner).to.equal(Game.STATUS.TIE);
        g.play(2,2);
        expect(g.status).to.equal(Game.STATUS.ENDED);
        expect(g.winner).to.equal(Game.STATUS.TIE);
    });

});


