var PLAYERS = require('../model/cell.js').players;

function valid(mark) {
    return PLAYERS.includes(mark);
}

function ExternalPlayer(mark, getInput) {
    if (!valid(mark)) throw new Error("Only X's and O's. -" + mark + "-");
    if (!getInput || typeof getInput !== 'function') throw new Error("Need a getInput function");

    Object.defineProperty(this, 'm', {
        get: function() { return mark; },
    });
    Object.defineProperty(this, 'input', {
        get: getInput,
    });
}

ExternalPlayer.prototype.generateMove = function(board) {
    return { textCmd: this.input };
};

module.exports = ExternalPlayer;
