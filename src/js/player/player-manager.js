var PLAYERS = require('../model/cell.js').players;
var HumanPlayer = require('./basic-external-player.js');
var QuincePlayer = require('./basic-quince-player.js');

function createPlayers(humanInputFunctions) {
    if(humanInputFunctions.length>2) {
        throw new Error('Number or players must be 0 =< n =< 2. [received: '+humanInputFunctions+']');
    }
    var plys = humanInputFunctions.map(function(cbk,i) {
        return new HumanPlayer(PLAYERS[i], cbk);
    });
    while (plys.length<2) {
        plys.push(new QuincePlayer(PLAYERS[plys.length]));
    }
    return plys;

}

//function PlayerManager(numHumanPlayers, cb) {
function PlayerManager(humanInputFunctions) {
    var turn = 1;

    var players = createPlayers(humanInputFunctions || []);

    Object.defineProperty(this, 'next', {
        get: function() {
            turn = 1-turn;
            return players[turn];
        }
    });

}


module.exports = PlayerManager;
