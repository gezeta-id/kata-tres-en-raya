import { Board } from '../model/Board';
import { Cell, EMPTY } from '../model/Cell';
import type { Mark } from '../model/Cell';

import { combinations, toMatrix, flatten } from '../../ts/util/matrixmath';

var LoShu:Array<number> = [6,1,8,7,5,3,2,9,4];
function isWin(a:number, b:number, c:number):boolean { return (a+b+c === 15); }

function turn(board:Array<Mark|typeof EMPTY>):number {
    return board.filter(function(m) { return !!m; }).length;
}

function move(val:number):{x:number,y:number,textCmd:string} {
    var idx = LoShu.indexOf(val);
    return {
        x: Math.floor(idx/3),
        y: idx%3,
        textCmd: ''+Math.floor(idx/3+1)+['a','b','c'][idx%3]
    };
}
function parse(board:Array<Mark|typeof EMPTY>, me:Mark):{mine:number[], theirs:number[], empty:number[]} {
    return board.reduce(function(k, c, idx:number) {
        if (!c) k.empty.push(LoShu[idx]);
        else if(c === me) k.mine.push(LoShu[idx]);
        else k.theirs.push(LoShu[idx]);
        return k;
    },({ mine:new Array<number>(), theirs:new Array<number>(), empty:new Array<number>() }));
}
function score(e:number, combos2:number[][], combos3:number[][], mine:number[]):number {
    return  3*combos2.filter(function(c) {
                return c.includes(e) && mine.some(function(m) {
                    return isWin(m,c[0],c[1]);
                });
            }).length +
            1*combos3.filter(function(c) {
                return c.includes(e) && isWin(c[0],c[1],c[2]);
            }).length;
}

function generate(board:Array<Mark|typeof EMPTY>, me:Mark) {
    var currentStatus = parse(board, me);

    if(turn(board) === 8) {
        return move(currentStatus.empty[0]);
    }

    if (currentStatus.mine.length > 1) {
        var myCombos = combinations(currentStatus.mine, 2);
        var winning = currentStatus.empty.find(function(w) {
            return myCombos.some(function(c) {
                return isWin(w, c[0], c[1]);
            });
        });
        if (winning) return move(winning);
    }

    if (currentStatus.theirs.length > 1) {
        var theirCombos = combinations(currentStatus.theirs, 2);
        var blocking = currentStatus.empty.find(function(b) {
            return theirCombos.some(function(c) {
                return isWin(b, c[0], c[1]);
            });
        });
        if (blocking) return move(blocking);
    }

    var emptyCombos2 = combinations(currentStatus.empty, 2);
    var emptyCombos3 = currentStatus.empty.length>2?combinations(currentStatus.empty, 3):[];
    var scores = currentStatus.empty.reduce(function(k, e) {
        k[e] = score(e, emptyCombos2, emptyCombos3, currentStatus.mine);
        return k;
    },new Array<number>());
    var bestMoves = currentStatus.empty.sort(function(a,b){ 
        return scores[a] < scores[b] ? 1 : -1;
    });
    bestMoves = bestMoves.slice(0, bestMoves.findIndex(function(m,i,a) {
        return i===0?false: (scores[a[i-1]] > scores[a[i]]);
    }));
    return move(bestMoves[Math.floor(Math.random()*bestMoves.length)]);
}

export class QuincePlayer {
    public readonly m:Mark;
    constructor(mark:Mark) {
        this.m = mark;
    }
    generateMove(board:Array<Array<Mark|typeof EMPTY>>):{x?:number,y?:number,textCmd:string} {
        var flatB = flatten<Mark|typeof EMPTY>(board);
        if(turn(flatB) === 0) {
            return move(5);
        } else {
            return generate(flatB, this.m);
        }
    }

}
