import { Board } from '../model/Board';
import { Cell, EMPTY } from '../model/Cell';
import type { Mark } from '../model/Cell';

export class ExternalPlayer {
    public readonly m:Mark;
    private inputFunction:Function;

    constructor(mark:Mark, getInput:Function) {
        this.m = mark;
        this.inputFunction = getInput;
    }
    generateMove(board:Array<Array<Mark|typeof EMPTY>>):{x?:number,y?:number,textCmd:string} {
        var input = this.inputFunction(board);
        if (typeof input === 'string') {
            return { textCmd: input };
        } else {
            return input;
        }
    }
}

