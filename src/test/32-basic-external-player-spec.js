var 
    sinon = require('sinon'),
    chai = require('chai'),
    expect = require('chai').expect;
var sinonChai = require("sinon-chai");

chai.use(sinonChai);


var PLAYERS = require('../js/model/cell.js').players;
var HumanPlayer = require('../js/player/basic-external-player.js');
var Game = require('../js/model/game.js');

var board;

describe('The Basic External Player...', function () {

    before(function() {
        var g = new Game();
        g.start();
        board = g.getBoard();
    });

    it('...can be instantiated with a correct player marker and an input callback', function() {
        var playerX = new HumanPlayer(PLAYERS[0], function(){});
        expect(playerX).not.to.be.null;

        var playerO = new HumanPlayer(PLAYERS[1], function(){});
        expect(playerO).not.to.be.null;
    });

    it('...can\'t be instantiated incorrectly', function() {
        expect(function() {
            var playerX = new HumanPlayer();
        }).to.throw;

        expect(function() {
            var playerX = new HumanPlayer('F');
        }).to.throw;

        expect(function() {
            var playerX = new HumanPlayer(PLAYERS[0]);
        }).to.throw;
    });

    it('...calls the passed input function and returns whatever it returns wrapped', function() {
        var returnInput = "a1";
        var mockInput = sinon.stub().returns(returnInput);

        var player = new HumanPlayer(PLAYERS[0], mockInput);

        var move = player.generateMove(board);

        expect(mockInput).to.have.been.called;

        expect(move).to.deep.equal({ textCmd: returnInput });
    });

});



