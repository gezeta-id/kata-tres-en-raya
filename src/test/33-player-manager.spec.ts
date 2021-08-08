import { describe } from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import SinonChai from 'sinon-chai';
const expect    = chai.expect;
chai.use(SinonChai);

import { Game, GameStatus } from '../ts/model/Game';
import { Cell, EMPTY } from '../ts/model/Cell';
import type { Mark } from '../ts/model/Cell';
import { PlayerManager } from '../ts/player/player-manager';

var board:Array<Array<Mark|typeof EMPTY>>;

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

        var p1 = pm.next();
        var p2 = pm.next();
        var p3 = pm.next();
        var p4 = pm.next();
        expect(p1.m).to.equal('X');
        expect(p1).to.equal(p3);
        expect(p2.m).to.equal('O');
        expect(p2).to.equal(p4);

        // Just for fun:
        expect(p1.generateMove(board)).to.deep.equal({ textCmd: 'a1' });
        expect(p2.generateMove(board)).to.deep.equal({ x:1, y:1, textCmd: '2b' });
    });

});

