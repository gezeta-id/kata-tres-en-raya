var PLAYERS = require('../../model/cell.js').players;
var Game = require('../../model/game.js');
var render = require('../out/text-board-printer.js');

var ACTIONS = {
    INIT: 'start'
};
// Bitter, Handle, EFFORT, POINTS, Double, Pencil

var commandPattern = /(^start$|(^[abc][ :-]*[123]$)|(^[123][ :-]*[abc]$))/i;

function outputStatus(game) {
    if (game.status === Game.STATUS.TIE) {
        return { status: 'TIE', msg: 'It\'s a tie!' };
    } else if (game.status === Game.STATUS.ENDED) {
        return { status: 'WIN', msg: game.winner + ' wins!' };
    } else {
        return { status: 'PLAYING', msg: render(game.getBoard()) };
    }
}

function valid(cmd) {
    return commandPattern.test(cmd);
}

function index(match) {
    var t = {
        'a': 0, 'b':1, 'c': 2, '1': 0, '2': 1, '3': 0
    };
    return t[match];
};
function parse(cmd) {
    if (/^start$/i.test(cmd)) {
        return { command: 'start' };
    } else {
        var y = index(cmd.match(/[abc]/i)[0].toLowerCase());
        var x = index(cmd.match(/[123]/i)[0]);
        return { command: 'play', args: [x,y] };
    }
}

function exe(action, game) {
    try {
        game[action.command].apply(game, action.args);
    } catch(e) {
        return e;
    }
    return outputStatus(game);
}

function GameController() {
    var game = new Game();
    this.command = function(cmd) {
        if (!valid(cmd)) throw new Error('Invalid command');
        var action = parse(cmd);
        if (action.command === ACTIONS.INIT) {
            game.start();
            return outputStatus(game);
        } else {
            return exe(action, game);
        }
    };
    this.getBoard = function() {
        return game.getBoard();
    };
}

module.exports = GameController;
