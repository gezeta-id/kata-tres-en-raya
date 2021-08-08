import { describe } from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import SinonChai from 'sinon-chai';
const expect    = chai.expect;
chai.use(SinonChai);

import { Game, GameStatus } from '../ts/model/Game';
import { Cell, EMPTY } from '../ts/model/Cell';
import type { Mark } from '../ts/model/Cell';
import { Board } from '../ts/model/Board';
import { combinations } from '../ts/util/matrixmath';
import { toMatrix } from '../ts/util/matrixmath';
import { ExternalPlayer as HumanPlayer } from '../ts/player/basic-external-player';

var board:Array<Array<Mark|typeof EMPTY>>;

describe('The Basic External Player...', function () {

    before(function() {
        var g = new Game();
        g.start();
        board = g.getBoard();
    });

    it('...can be instantiated with a correct player marker and an input callback', function() {
        var playerX = new HumanPlayer('X', function(){});
        expect(playerX).not.to.be.null;

        var playerO = new HumanPlayer('O', function(){});
        expect(playerO).not.to.be.null;
    });

    it('...calls the passed input function and returns whatever it returns wrapped', function() {
        var returnInput = "a1";
        var mockInput = sinon.stub().returns(returnInput);

        var player = new HumanPlayer('X', mockInput);

        var move = player.generateMove(board);

        expect(mockInput).to.have.been.called;

        expect(move).to.deep.equal({ textCmd: returnInput });
    });

    it('...calls the passed input function and returns whatever it returns', function() {
        var returnInput = { x: 1, y: 1, txtCmd: 'a1' };
        var mockInput = sinon.stub().returns(returnInput);

        var player = new HumanPlayer('X', mockInput);

        var move = player.generateMove(board);

        expect(mockInput).to.have.been.called;

        expect(move).to.deep.equal(returnInput);
    });
});


