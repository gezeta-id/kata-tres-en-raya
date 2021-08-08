import { describe } from 'mocha';
import { expect } from 'chai';

import { Board } from '../ts/model/Board.js';
import { EMPTY } from '../ts/model/Cell.js';

describe('Board', function () {
    it('...can be created without any further information', function() {
        var b = new Board();
        expect(b).not.to.be.null;
    });
    it('...gives read access to the board\'s content', function() {
        var b = new Board();
        expect(b.board()).not.to.be.null;
        expect(b.board().length).to.equal(9);
    });
    it('...exposes move availability on some coordinates', function() {
        var b = new Board();
        expect(b.empty(0,0)).to.be.true;
    });
    it('...allows playing on a non-empty cell', function() {
        var b = new Board();
        b.play(0,0, 'X');
        b.play(0,0, 'O');
        expect(b.board()[0].m).to.equal('O');
    });
    it('...allows a move to be played on some coordinates', function() {
        var b = new Board();
        b.play(0,0, 'X');
        expect(b.empty(0,0)).to.be.false;
    });
    it('...let\'s search for empty cells', function() {
        var b = new Board();
        b.play(0,0,'X');
        b.play(1,0,'X');
        b.play(0,1,'X');
        b.play(0,2,'O');
        expect(b.cells(EMPTY)).to.be.an('array').and.have.lengthOf(5);
    });
    it('...let\'s search for the cells occupied by a player', function() {
        var b = new Board();
        b.play(0,0,'X');
        b.play(1,0,'X');
        b.play(0,1,'X');
        b.play(0,2,'O');
        expect(b.cells('X')).to.be.an('array').and.have.lengthOf(3);
    });
});

