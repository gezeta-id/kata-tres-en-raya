import { describe } from 'mocha';
import { expect } from 'chai';

import { Game, GameStatus } from '../ts/model/Game';
import { Cell, EMPTY } from '../ts/model/Cell';
import type { Mark } from '../ts/model/Cell';
import { Board } from '../ts/model/Board';
import { combinations } from '../ts/util/matrixmath';
import { toMatrix } from '../ts/util/matrixmath';
import { QuincePlayer } from '../ts/player/basic-quince-player';

var emptyBoard:Array<Array<Mark|typeof EMPTY>> = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
var ongoingBoard:Array<Array<Mark|typeof EMPTY>> = [ [ undefined, undefined, 'O' ], [ undefined, 'X', undefined ], [ undefined, undefined, undefined ] ];
var onlyOneCellEmptyBoard:Array<Array<Mark|typeof EMPTY>> = [ [ 'O', undefined, 'X' ], [ 'O', 'X', 'X' ], [ 'X', 'O', 'X' ] ];
var onlyCellLeft = {x:0,y:1, textCmd:'1b'};
var centralCell  = {x:1,y:1, textCmd:'2b'};
var acceptableMoves = [ {x:0,y:0, textCmd:'1a'}, {x:1,y:0, textCmd:'2a'}, {x:2,y:1, textCmd:'3b'}, {x:2,y:2, textCmd:'3c'} ];

var winnableBoard:{board:Array<Array<Mark|typeof EMPTY>>, expected:{x:number,y:number,textCmd:string}};
var blockableBoard:{board:Array<Array<Mark|typeof EMPTY>>, expected:{x:number,y:number,textCmd:string}};

function playSequence(seq:Array<{x:number,y:number}>, g:Game) {
    seq.forEach(function(m) { g.play(m.x,m.y); });
}
var SEQUENCES = {
    'a tie': {
        partOne: [
            {x:1,y:1},
                        {x:0,y:2}
        ],
        partTwo: [
            {x:1,y:2},
                        {x:1,y:0},
            {x:2,y:2},
                        {x:0,y:0},
            {x:2,y:0},
                        {x:2,y:1}
        ],
        partThree: [
            {x:0,y:1}
        ]
    },
    'winnable': {
        seq: [
            {x:1,y:1},
                        {x:0,y:0},
            {x:1,y:0},
                        {x:2,y:1}
        ],
        expected: {x:1,y:2, textCmd:'2c'}
    },
    'blockable': {
        seq: [
            {x:1,y:1},
                        {x:0,y:0},
            {x:2,y:2},
                        {x:0,y:1}
        ],
        expected: {x:0,y:2, textCmd:'1c'}
    }
};

describe('The Basic Quince Player...', function () {

    before(function() {
        var g = new Game();
        // I should probably get all these hardwritten, but...
        g.start();
        emptyBoard = g.getBoard();
        playSequence(SEQUENCES['a tie'].partOne, g);
        ongoingBoard = g.getBoard();
        playSequence(SEQUENCES['a tie'].partTwo, g);
        onlyOneCellEmptyBoard = g.getBoard();

        g.start();
        playSequence(SEQUENCES['winnable'].seq, g);
        winnableBoard = {
            board: g.getBoard(),
            expected: SEQUENCES['winnable'].expected
        };
        g.start();
        playSequence(SEQUENCES['blockable'].seq, g);
        blockableBoard = {
            board: g.getBoard(),
            expected: SEQUENCES['blockable'].expected
        };
    });

    it('...can be instantiated with a correct player marker', function() {
        var playerX = new QuincePlayer('X');
        expect(playerX).not.to.be.null;

        var playerO = new QuincePlayer('O');
        expect(playerO).not.to.be.null;
    });

    it('...always plays center cell if it\'s the first move', function() {
        var player = new QuincePlayer('X');

        var move = player.generateMove(emptyBoard);

        expect(move).to.deep.equal(centralCell);
    });

    it('...plays the only cell available when only one is available', function() {
        var player = new QuincePlayer('X');

        var move = player.generateMove(onlyOneCellEmptyBoard);

        expect(move).to.deep.equal(onlyCellLeft);
    });

    it('...plays a winning move, when one is available', function() {
        var player = new QuincePlayer('X');

        var move = player.generateMove(winnableBoard.board);

        expect(move).to.deep.equal(winnableBoard.expected);
    });

    it('...plays a blocking move, when one is available, and no winning move is', function() {
        var player = new QuincePlayer('X');

        var move = player.generateMove(blockableBoard.board);

        expect(move).to.deep.equal(blockableBoard.expected);
    });

    it('...plays a reasonable strategic move when no other more interesting moves are available', function() {
        var player = new QuincePlayer('X');

        var move = player.generateMove(ongoingBoard);

        expect(acceptableMoves).to.deep.include(move);
    });
    /*
    */
});



