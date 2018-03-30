import { other } from './utils';
export class TimedProxy {
    constructor(game, opt = {}) {
        this.limit = 10000;
        this.countdown = 5;
        this.countdownSignal = 3;
        this.signalDelay = 100;
        this.counter = -1;
        this.counterSignal = -1;
        this.expired = false;
        this.pending = false;
        this.timer = null;
        this.timeoutWinner = null;
        this.game = game;
        this.constructor = game.constructor;
        Object.assign(this, opt);
        this.bind('winning');
        this.bind('links');
        this.bind('rulers');
    }
    dispose() {
        this.stop();
    }
    get grid() {
        return this.game.grid;
    }
    get scale() {
        return this.game.scale;
    }
    get moves() {
        return this.game.moves;
    }
    possible() {
        return this.game.possible();
    }
    undo() {
        this.game.undo();
    }
    move(m) {
        this.game.move(m);
        if (!this.game.winner && this.game.moves[this.game.moves.length - 1]) {
            this.start();
        }
        else {
            this.stop();
            this.counter = -1;
            this.counterSignal = -1;
            this.expired = false;
        }
    }
    evaluate() {
        return this.game.evaluate();
    }
    get player() {
        return this.game.player;
    }
    get winner() {
        return this.timeoutWinner || this.game.winner;
    }
    get score() {
        return this.game.score;
    }
    get landscape() {
        return this.game.landscape;
    }
    get hull() {
        return this.game.hull;
    }
    moveToString(move) {
        return this.game.moveToString ? this.game.moveToString(move) : '';
    }
    stringToMove(move) {
        return this.game.stringToMove(move);
    }
    start() {
        this.stop(!!this.limit);
        this.counter = -1;
        this.counterSignal = -1;
        this.expired = false;
        this.timeoutWinner = null;
        if (!this.limit) {
            return;
        }
        let counter = this.countdown;
        this.timer = setInterval(() => {
            this.stop(true);
            this.counter = counter;
            this.timer = setInterval(() => {
                counter--;
                if (counter <= this.countdownSignal) {
                    this.counterSignal = counter;
                }
                setTimeout(() => {
                    this.counter = counter;
                    if (!counter) {
                        this.stop();
                        this.expired = true;
                        this.timeoutWinner = other(this.game.player);
                    }
                }, this.signalDelay);
            }, 1000);
        }, this.limit - counter * 1000 - this.signalDelay);
    }
    stop(pending = false) {
        this.pending = pending;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    bind(prop) {
        if (this.game[prop]) {
            this[prop] = this.game[prop].bind(this.game);
        }
    }
}
//# sourceMappingURL=TimedProxy.js.map