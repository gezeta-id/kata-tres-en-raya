import { EMPTY } from '../../model/Cell';
import type { Mark } from '../../model/Cell';
import { Game, GameStatus } from '../../model/Game';

import { render } from '../out/text-board-printer';

// Bitter, Handle, EFFORT, POINTS, Double, Pencil
var commandPattern = /(^start$|(^[abc][ :-]*[123]$)|(^[123][ :-]*[abc]$))/i;

function valid(cmd:string):boolean {
    return !!commandPattern.test(cmd);
}
function outputStatus(game:Game):{status:GameStatus, msg:string, winner?:Mark } {
    if (game.state() === GameStatus.TIE) {
        return { status: GameStatus.TIE, msg: render(game.getBoard()) };
    } else if (game.state() === GameStatus.ENDED) {
        return { status: GameStatus.ENDED, msg: render(game.getBoard()), winner: game.result() };
    } else {
        return { status: GameStatus.PLAYING, msg: render(game.getBoard()) };
    }
}

function index(match:string):number {
    return ['a','b','c','1','2','3'].indexOf(match)%3;
}
function parse(cmd:string):{command:('start'|'play'), args?:number[]} {
    if (/^start$/i.test(cmd)) {
        return { command: 'start' };
    } else {
        var ypart:string[] = cmd.match(/[abc]/i) ||[''];
        var y = index(ypart[0].toLowerCase());
        var xpart:string[] = cmd.match(/[123]/i) ||[''];
        var x = index(xpart[0]);
        return { command: 'play', args: [x,y] };
    }
}

function exe(action:{command:('start'|'play'), args?:number[]}, game:Game):{status:GameStatus, msg:string, winner?:Mark } {
    try {
        game[action.command](action.args?action.args[0]:0, action.args?action.args[1]:0);
    } catch(e) {
        return e;
    }
    return outputStatus(game);
}

export class GameController {
    private game:Game  = new Game();
    public readonly ACTIONS = {
        INIT: 'start'
    };

    command(cmd:string) {
        if (!valid(cmd)) throw new Error('Invalid command');
        var action = parse(cmd);
        if (action.command === this.ACTIONS.INIT) {
            this.game.start();
            return outputStatus(this.game);
        } else {
            return exe(action, this.game);
        }
    }

    getBoard() {
        return this.game.getBoard();
    }
}
