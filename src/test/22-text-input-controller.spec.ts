import { describe } from 'mocha';
import { expect } from 'chai';

import { GameController } from '../ts/ui/in/text-command-controller';

describe('The controller...', function () {

    it('...can be instantiated', function() {
        var controller = new GameController();

        expect(controller).not.to.be.null;
    });

    it('...allows initializing the game', function() {
        var controller = new GameController();

        var status = controller.command('start');
        var expectedBoard = '  A B C\n'+
                            '       \n'+
                            '1  │ │ \n'+
                            '  ─┼─┼─\n'+
                            '2  │ │ \n'+
                            '  ─┼─┼─\n'+
                            '3  │ │ \n';

        expect(status).to.deep.equal({status:'PLAYING', msg:expectedBoard});
    });

    it('...allows making a first move', function() {
        var controller = new GameController();
        var status = controller.command('start');

        status = controller.command('b1');
        var expectedBoard = '  A B C\n'+
                            '       \n'+
                            '1  │X│ \n'+
                            '  ─┼─┼─\n'+
                            '2  │ │ \n'+
                            '  ─┼─┼─\n'+
                            '3  │ │ \n';

        expect(status).to.deep.equal({status:'PLAYING', msg:expectedBoard});
    });

    it('...allows making a second move', function() {
        var controller = new GameController();
        var status = controller.command('start');
        status = controller.command('b1');

        status = controller.command('2A');
        var expectedBoard = '  A B C\n'+
                            '       \n'+
                            '1  │X│ \n'+
                            '  ─┼─┼─\n'+
                            '2 O│ │ \n'+
                            '  ─┼─┼─\n'+
                            '3  │ │ \n';

        expect(status).to.deep.equal({status:'PLAYING', msg:expectedBoard});
    });
    it('...allows making moves in different formats', function() {
        var controller = new GameController();
        var status = controller.command('start');
        status = controller.command('b-1');

        status = controller.command('2 : A');
        var expectedBoard = '  A B C\n'+
                            '       \n'+
                            '1  │X│ \n'+
                            '  ─┼─┼─\n'+
                            '2 O│ │ \n'+
                            '  ─┼─┼─\n'+
                            '3  │ │ \n';

        expect(status).to.deep.equal({status:'PLAYING', msg:expectedBoard});
    });

});


