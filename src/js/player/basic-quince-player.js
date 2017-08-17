var PLAYERS = require('../model/cell.js').players;
// var Game = require('../model/game.js');

var mtx = require('../util/math');

var LoShu = [6,1,8,7,5,3,2,9,4];
function move(val) {
    var idx = LoShu.indexOf(val);
    return {
        x: Math.floor(idx/3),
        y: idx%3,
        textCmd: ''+Math.floor(idx/3+1)+['a','b','c'][idx%3]
    };
}

function valid(mark) {
    return PLAYERS.includes(mark);
}

function QuincePlayer(mark) {
    if (!valid(mark)) throw new Error("Only X's and O's. -" + mark + "-");
    Object.defineProperty(this, 'm', {
        get: function() { return mark; },
    });
}

function isWin(a,b,c) { return (a+b+c === 15); }

function turn(board) {
    return board.filter(function(m) { return !!m; }).length;
}

function parse(board, me) {
    return board.reduce(function(k, c, idx) {
        if (!c) k.empty.push(LoShu[idx]);
        else if(c === me) k.mine.push(LoShu[idx]);
        else k.theirs.push(LoShu[idx]);
        return k;
    },{ mine: [], theirs: [], empty: [] });
}

function score(e, combos2, combos3, mine) {
    return  3*combos2.filter(function(c) {
                return c.includes(e) && mine.some(function(m) {
                    return isWin(m,c[0],c[1]);
                });
            }).length +
            1*combos3.filter(function(c) {
                return c.includes(e) && isWin(c[0],c[1],c[2]);
            }).length;
}
function generate(board, me) {
    var currentStatus = parse(board, me);

    if(turn(board) === 8) {
        return move(currentStatus.empty[0]);
    }

    if (currentStatus.mine.length > 1) {
        var myCombos = mtx.combinations(currentStatus.mine, 2);
        var winning = currentStatus.empty.find(function(w) {
            return myCombos.some(function(c) {
                return isWin(w, c[0], c[1]);
            });
        });
        if (winning) return move(winning);
    }

    if (currentStatus.theirs.length > 1) {
        var theirCombos = mtx.combinations(currentStatus.theirs, 2);
        var blocking = currentStatus.empty.find(function(b) {
            return theirCombos.some(function(c) {
                return isWin(b, c[0], c[1]);
            });
        });
        if (blocking) return move(blocking);
    }

    var emptyCombos2 = mtx.combinations(currentStatus.empty, 2);
    var emptyCombos3 = currentStatus.empty.length>2?mtx.combinations(currentStatus.empty, 3):[];
    var scores = currentStatus.empty.reduce(function(k, e) {
        k[e] = score(e, emptyCombos2, emptyCombos3, currentStatus.mine);
        return k;
    },{});
    var bestMoves = currentStatus.empty.sort(function(a,b){ return scores[a] < scores[b]; });
    bestMoves = bestMoves.slice(0, bestMoves.findIndex(function(m,i,a) {
        return i===0?false: (scores[a[i-1]] > scores[a[i]]);
    }));
    return move(bestMoves[Math.floor(Math.random()*bestMoves.length)]);
}

QuincePlayer.prototype.generateMove = function(board) {
    board = mtx.flatten(board);
    if(turn(board) === 0) {
        return move(5);
    } else {
        return generate(board, this.m);
    }
};

module.exports = QuincePlayer;
