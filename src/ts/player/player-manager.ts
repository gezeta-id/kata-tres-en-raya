import { Cell, EMPTY } from '../model/Cell';
import type { Mark } from '../model/Cell';
import { QuincePlayer } from './basic-quince-player';
import { ExternalPlayer } from './basic-external-player';


function createPlayers(humanInputFunctions:Array<Function>):Array<ExternalPlayer|QuincePlayer> {
    if(humanInputFunctions.length>2) {
        throw new Error('Number or players must be 0 =< n =< 2. [received: '+humanInputFunctions+']');
    }
    var plys:Array<ExternalPlayer|QuincePlayer> = humanInputFunctions.map(function(cbk,i) {
        return new ExternalPlayer(<Mark> ['X', 'O'][i], cbk);
    });
    while (plys.length<2) {
        plys.push(new QuincePlayer(<Mark> ['X','O'][plys.length]));
    }
    return plys;

}

export class PlayerManager {
    private turn = 1;
    private players:Array<ExternalPlayer|QuincePlayer> = [];
    constructor(humanInputFunctions:Array<Function>=[]) {
        this.players = createPlayers(humanInputFunctions);
    }
    next() {
        this.turn = 1-this.turn;
        return this.players[this.turn];
    }

}


