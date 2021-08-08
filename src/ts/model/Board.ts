import { Cell, EMPTY } from './Cell.js';
import type { Mark } from './Cell.js';

function buildMagicArray():Cell[] {
    return [6,1,8,7,5,3,2,9,4].map(function(p) { return new Cell(p); });
}
function index(x:number,y:number):number { return x*3+y; }

function movesFor(player:Mark) {
    return function(cell:Cell) { return cell.m === player; };
}
function emptyCell(cell:Cell) { return cell.m === EMPTY; }

export class Board {
    private b = buildMagicArray();

    empty(x:number, y:number):boolean {
        var idx = index(x,y);
        if (idx < 0 || idx > 8) throw new Error('Invalid coordinates');
        return this.b[idx].m === EMPTY;
    };

    play(x:number, y:number, player:Mark) {
        var idx = index(x,y);
        if (idx < 0 || idx > 8) throw new Error('Invalid coordinates');
        this.b[idx] = this.b[idx].mark(player);
        return this;
    };

    cells(player:Mark|typeof EMPTY) {
        if (player === EMPTY) {
            return this.b.filter(emptyCell);
        } else {
            return this.b.filter(movesFor(player));
        }
    };

    board() {
        return this.b.slice(0);
    }
}

