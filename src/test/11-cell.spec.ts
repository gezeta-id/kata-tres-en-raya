import { describe } from 'mocha';
import { expect } from 'chai';

import { Cell, EMPTY } from '../ts/model/Cell.js';
import type { Mark } from '../ts/model/Cell.js';

describe('Cell', function() {
    it('...is empty or holds a valid mark', function() {
        let c = new Cell(1);
        expect(c).not.to.be.null;
        expect(c.m).to.equal(EMPTY);
        expect(c.w).to.equal(1);

        let d = new Cell(3,'X');
        expect(d).not.to.be.null;
        expect(d.m).to.equal('X');
        expect(d.w).to.equal(3);

        let e = new Cell(7,'O');
        expect(e).not.to.be.null;
        expect(e.m).to.equal('O');
        expect(e.w).to.equal(7);

    });
    it('...is immutable. Setting the mark, builds a new Cell with the same weight and the new mark', function () {
        var c = new Cell(5, 'X');
        var d = c.mark('O');
        expect(c.m).to.equal('X');
        expect(d.m).to.equal('O');
        expect(d.w).to.equal(c.w);
    });

});


