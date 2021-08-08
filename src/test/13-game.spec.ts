import { describe } from 'mocha';
import { expect } from 'chai';

import { Game, GameStatus } from '../ts/model/Game';
import { Cell, EMPTY } from '../ts/model/Cell';
import { Board } from '../ts/model/Board';
import { combinations } from '../ts/util/matrixmath';
import { toMatrix } from '../ts/util/matrixmath';

var to3x3 = toMatrix(3);

function playSequence(seq:Array<{x:number,y:number}>, g:Game) {
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
        var b = new Game();
        expect(b).not.to.be.null;
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
        expect(g.getBoard()).to.deep.equal([['X',EMPTY,EMPTY],['O',EMPTY,EMPTY],[EMPTY,EMPTY,EMPTY]]);
    });

    it('...a game is won when a player gets three pieces in line', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['x wins'],g);
        expect(g.state()).to.equal(GameStatus.ENDED);
        expect(g.result()).to.equal('X');
    });

    it('...once a game is won, further moves are ignored', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['x wins'],g);
        expect(g.state()).to.equal(GameStatus.ENDED);
        expect(g.result()).to.equal('X');
        g.play(2,2);
        expect(g.state()).to.equal(GameStatus.ENDED);
        expect(g.result()).to.equal('X');
    });

    it('...if all cells are used, it\'s a tie', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['a tie'],g);
        expect(g.state()).to.equal(GameStatus.TIE);
        expect(g.result()).to.equal(undefined);
    });

    it('...once a game is tied, further moves are ignored', function() {
        var g = new Game();
        g.start();
        playSequence(SEQUENCES['a tie'],g);
        expect(g.state()).to.equal(GameStatus.TIE);
        expect(g.result()).to.equal(undefined);
        g.play(2,2);
        expect(g.state()).to.equal(GameStatus.TIE);
        expect(g.result()).to.equal(undefined);
    });
});


