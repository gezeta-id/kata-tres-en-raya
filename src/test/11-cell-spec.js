var 
    sinon = require('sinon'),
    expect = require('chai').expect;

var Cell = require('../js/model/cell.js');

describe('Cell', function () {
    it('...has a static immutable players property', function() {
        expect(Cell.players).to.deep.equal(['X','O']);
        Cell.players = [1,2,3];
        expect(Cell.players).to.deep.equal(['X','O']);
    });
    it('...holds nothing or a valid value', function() {
        var c = new Cell(1);
        expect(c).not.to.be.null;
        expect(c.m).to.equal(Cell.EMPTY);
        expect(c.w).to.equal(1);

        var d = new Cell(3,'X');
        expect(d).not.to.be.null;
        expect(d.m).to.equal('X');
        expect(d.w).to.equal(3);

        var e = new Cell(7,'O');
        expect(e).not.to.be.null;
        expect(e.m).to.equal('O');
        expect(e.w).to.equal(7);
    });
    it('...throws if a non valid value is passed to the constructor', function() {
        expect(function() { var c = new Cell(1,'F'); }).to.throw();
    });
    it('...throws if a non valid value is passed to mark method', function() {
        var c = new Cell(1,'X'); 
        expect(function() { c.mark('F'); }).to.throw();
    });
    it('...is immutable. Setting the mark, builds a new Cell with the same weight and the new mark', function () {
        var c = new Cell(5, 'X');
        var d = c.mark('O');
        expect(c.m).to.equal('X');
        expect(d.m).to.equal('O');
        expect(d.w).to.equal(c.w);
    });
});
