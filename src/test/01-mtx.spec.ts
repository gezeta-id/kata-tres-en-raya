import { describe } from 'mocha';
import { expect } from 'chai';

import { combinations } from '../ts/util/matrixmath';
import { toMatrix } from '../ts/util/matrixmath';

// TODO: These tests are... weak. Then again there isn't much functionality to begin with

describe('Matrix functions', function () {
    it('...toMatrix converts linear vector to two dimensional matrix', function() {
        var to2x2 = toMatrix(2);
        expect(to2x2([1,2,3,4])).to.deep.equal([[1,2],[3,4]]);
    });
    it('...combinations calculates the possible combinations', function() {
        var combos = combinations([1,2,3],2);
        expect(combos).to.deep.equal([[1,2],[1,3],[2,3]]);
    });
});



