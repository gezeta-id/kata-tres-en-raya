import { EMPTY } from '../../model/Cell';
import type { Mark } from '../../model/Cell';

function c(x?:string) { return x||' '; }

export function render(matrix:Array<Array<Mark|typeof EMPTY>>):string {
    var r = matrix.reduce(function(k,r,i) {
        k.push(String(i+1)+ ' ' +r.map(c).join('│')+'\n');
        return k;
    }, [] as Array<string>).join('  ─┼─┼─\n');
    return '  A B C\n       \n'+r;
}

