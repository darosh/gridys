import { other } from '../../utils';
import { QuirkatBoard } from '../base/QuirkatBoard';
import { expandJumps, jumpsPossible, leavesToMoves, leaveToMove, multiJumps } from '../utils/quirkat';
import { jumpsToString, stringsToJump } from '../utils/serialization';
export class CatchTheHareGameBase extends QuirkatBoard {
    constructor(grid, maxMoves) {
        super(grid);
        this.moveToString = jumpsToString.bind(this);
        this.stringToMove = stringsToJump.bind(this);
        this.jumpsPossible = jumpsPossible.bind(this);
        this.multiJumps = multiJumps.bind(this);
        this.leavesToMoves = leavesToMoves.bind(this);
        this.leaveToMove = leaveToMove.bind(this);
        this.expandJumps = expandJumps.bind(this);
        this.score = {};
        this.finished = false;
        this.maxMoves = maxMoves;
    }
    move(m) {
        const first = m[0];
        let last = m[m.length - 1];
        last = Array.isArray(last) ? last[0] : last;
        for (let i = 1; i < m.length; i++) {
            if (Array.isArray(m[i])) {
                this.score[m[i][1].data]--;
                m[i][1].data = null;
            }
        }
        last.data = first.data;
        if (last !== first) {
            first.data = null;
        }
        this.player = other(this.player);
        this.moves.push(m);
        this.winner = this.getWinner();
        if (this.winner) {
            this.finished = true;
        }
    }
    possible() {
        if (this.finished) {
            return [];
        }
        if (this.player === 1) {
            return this.possibleHunters(1);
        }
        else {
            return this.possibleHunters(2).concat(this.possibleHare());
        }
    }
    undo() {
        const m = this.moves.pop();
        const first = m[0];
        let last = m[m.length - 1];
        last = Array.isArray(last) ? last[0] : last;
        const o = other(last.data);
        for (let i = m.length - 1; i > 0; i--) {
            const n = m[i];
            if (Array.isArray(n)) {
                this.score[o]++;
                n[1].data = o;
            }
        }
        first.data = last.data;
        if (last !== first) {
            last.data = null;
        }
        this.winner = 0;
        this.finished = false;
        this.player = other(this.player);
    }
    evaluate() {
        throw new Error('Method not implemented.');
    }
    possibleHunters(value) {
        return this.grid.tiles
            .filter((t) => t.data === value)
            .reduce((r, t) => {
            for (const [n, m] of t.links) {
                if (!m.data) {
                    r.push([t, m]);
                }
            }
            return r;
        }, []);
    }
    possibleHare() {
        let result = this.jumpsPossible();
        result = this.expandJumps(result);
        result = this.leavesToMoves(result);
        return result;
    }
    getWinner() {
        if (this.possible().length === 0) {
            return other(this.player);
        }
        if (this.score[1] <= 9) {
            return 2;
        }
        if (this.moves.length === this.maxMoves) {
            return -1;
        }
        return 0;
    }
}
CatchTheHareGameBase.title = 'Catch the Hare';
CatchTheHareGameBase.group = 'Qirkat';
CatchTheHareGameBase.wiki = 'https://en.wikipedia.org/wiki/Catch_the_Hare';
CatchTheHareGameBase.location = 'Europe';
CatchTheHareGameBase.created = 1283;
//# sourceMappingURL=CatchTheHareGameBase.js.map