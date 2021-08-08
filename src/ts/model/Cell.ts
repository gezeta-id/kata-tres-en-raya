export type Mark = 'X' | 'O';
export const EMPTY = undefined;

export class Cell {
    readonly w: number;
    readonly m: Mark | undefined;

    constructor(w:number = 0, m: Mark|undefined = EMPTY) {
        this.w = w;
        this.m = m;
    }
    mark(m:Mark) {
        return new Cell(this.w, m);
    }
}

