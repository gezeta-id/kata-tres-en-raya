var 
    sinon = require('sinon'),
    expect = require('chai').expect;

var mtx = require('../js/util/math');

// TODO: These tests are... weak. Then again there isn't much functionality to begin with

describe('Matrix functions', function () {
    it('...toMatrix converts linear vector to two dimensional matrix', function() {
        var to2x2 = mtx.toMatrix(2);
        expect(to2x2([1,2,3,4])).to.deep.equal([[1,2],[3,4]]);
    });
    it('...combinations calculates the possible combinations', function() {
        var combinations = mtx.combinations([1,2,3],2);
        expect(combinations).to.deep.equal([[1,2],[1,3],[2,3]]);
    });
});



