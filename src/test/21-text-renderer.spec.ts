import { describe } from 'mocha';
import { expect } from 'chai';

import { EMPTY } from '../ts/model/Cell';
import type { Mark } from '../ts/model/Cell';
import { render } from '../ts/ui/out/text-board-printer';

describe('The text renderer...', function () {
    it('...prints a matrix decorated and into separate lines', function() {
        var array:Array<Array<Mark|typeof EMPTY>> = [['X',undefined,'O'],['O',undefined,'X'],['X',undefined,'O']];
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


