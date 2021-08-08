var 
    sinon = require('sinon'),
    expect = require('chai').expect;

var render = require('../js/ui/out/text-board-printer.js');

describe('The text renderer...', function () {
    it('...prints a matrix decorated and into separate lines', function() {
        var array = [['X',undefined,'O'],['O',undefined,'X'],['X',undefined,'O']];
        var expected = '  A B C\n'+
                       '       \n'+
                       '1 X│ │O\n'+
                       '  ─┼─┼─\n'+
                       '2 O│ │X\n'+
                       '  ─┼─┼─\n'+
                       '3 X│ │O\n';
        expect(render(array)).to.equal(expected);
    });
});

