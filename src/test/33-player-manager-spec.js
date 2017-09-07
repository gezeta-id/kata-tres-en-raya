var 
    sinon = require('sinon'),
    chai = require('chai'),
    expect = require('chai').expect;
var sinonChai = require("sinon-chai");

chai.use(sinonChai);


var PLAYERS = require('../js/model/cell.js').players;
var Game = require('../js/model/game.js');
var PlayerManager = require('../js/player/player-manager.js');

var board;

describe('The Player Manager...', function () {

    before(function() {
        var g = new Game();
        g.start();
        board = g.getBoard();
    });

    it('...can be instantiated with no input functions for no external players', function() {
        var pm = new PlayerManager();
        expect(pm).not.to.be.null;
    });

    it('...can be instantiated with 1 input function for 1 external player', function() {
        var pm = new PlayerManager([
            function() { return 'a1'; }
        ]);
        expect(pm).not.to.be.null;
    });

    it('...can be instantiated with 2 input functions for 2 external players', function() {
        var pm = new PlayerManager([
            function() { return 'a1'; },
            function() { return 'b1'; }
        ]);
        expect(pm).not.to.be.null;
    });
    it('...can\'t be instantiated with more than 2 input functions', function() {
        expect(function() {
        var pm = new PlayerManager([
            function() { return 'a1'; },
            function() { return 'c1'; },
            function() { return 'b1'; }
        ]);
        }).to.throw;
    });

    it('...gives back an alternating player each time', function() {
        var pm = new PlayerManager([
            function() { return 'a1'; }
        ]);

        var p1 = pm.next;
        var p2 = pm.next;
        var p3 = pm.next;
        var p4 = pm.next;
        expect(p1.m).to.equal(PLAYERS[0]);
        expect(p1).to.equal(p3);
        expect(p2.m).to.equal(PLAYERS[1]);
        expect(p2).to.equal(p4);

        // Just for fun:
        expect(p1.generateMove(board)).to.deep.equal({ textCmd: 'a1' });
        expect(p2.generateMove(board)).to.deep.equal({ x:1, y:1, textCmd: '2b' });
    });

});
