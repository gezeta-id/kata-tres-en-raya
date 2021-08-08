import { Cell, EMPTY } from './Cell';
import type { Mark } from './Cell';
import { Board } from './Board';

import { combinations, toMatrix, flatten } from '../util/matrixmath';

var to3x3 = toMatrix<Cell>(3);

function isWinnerCombination(combination:Cell[]):boolean {
    return combination.reduce(function(k,c) { return k + c.w; },0) === 15;
}
function hasWinnerMove(cells:Cell[]):boolean {
    return combinations(cells, 3).some(isWinnerCombination);
}
function noMoreEmptyCells(table:Board):boolean {
    return table.cells(EMPTY).length === 0;
}

function check(table:Board, player:Mark):boolean {
    var myCells = table.cells(player);
    return hasWinnerMove(myCells);
}

export enum GameStatus {
  UNINITIALIZED = 'UNINITIALIZED',
  PLAYING = 'PLAYING',
  ENDED = 'ENDED',
  TIE = 'TIE'
}

export class Game {
    private table:Board = new Board();
    private turnn:number = 0;
    private status:GameStatus = GameStatus.UNINITIALIZED;
    private winner:Mark|typeof EMPTY;


    result():Mark|typeof EMPTY { return this.winner; }
    state():GameStatus { return this.status; }

    start() {
        this.table = new Board();
        this.turnn = 0;
        this.status = GameStatus.PLAYING;
        this.winner = undefined;
    }

    getBoard() {
        return to3x3(this.table.board().map(function(c) { return c.m; }));
    }

    turn():Mark {
        if (this.turnn===0) return 'X';
        else return 'O';
    }

    play(x:number, y:number):Game {

        if(this.status === GameStatus.UNINITIALIZED) {
            throw new Error('Game hasn\'t been initialized yet.');
        } else if(this.status === GameStatus.ENDED) {
            return this;
        }

        if(!this.table.empty(x, y)) { return this; }

        this.table.play(x, y, this.turn());

        if (!check(this.table, this.turn())) {
            this.turnn = 1 - this.turnn;
        } else {
            this.status = GameStatus.ENDED;
            this.winner = this.turn();
            return this;
        }
        if(noMoreEmptyCells(this.table)) {
            this.status = GameStatus.TIE;
            this.winner = undefined;
            return this;
        }
        return this;

    }
}
