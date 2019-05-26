import { other } from '../../utils';
import { quirkatSetup } from '../utils/quirkat';
import { jumpsToString, stringsToJump } from '../utils/serialization';
import { QuirkatBoard } from './QuirkatBoard';
export class QirkatGameBase extends QuirkatBoard {
    constructor(grid, maxMoves) {
        super(grid);
        this.moveToString = jumpsToString.bind(this);
        this.stringToMove = stringsToJump.bind(this);
        this.finished = false;
        this.maxMoves = maxMoves;
        quirkatSetup(grid.tiles);
        const stones = (grid.tiles.length - 1) / 2;
        this.score = { 1: stones, 2: stones };
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
    getWinner() {
        if (!this.score[1]) {
            return 2;
        }
        else if (!this.score[2]) {
            return 1;
        }
        else if (this.moves.length === this.maxMoves) {
            return -1;
        }
        else {
            return 0;
        }
    }
    possible() {
        if (this.finished) {
            return [];
        }
        let result = this.jumpsPossible();
        result = this.topJumps(result);
        result = this.leavesToMoves(result);
        if (!result.length) {
            result = this.simplePossible();
        }
        return result;
    }
    leavesToMoves(r) {
        return r.map(this.leaveToMove);
    }
    leaveToMove(nodeInput) {
        const result = [];
        let node = nodeInput;
        while (node) {
            if (node.parent) {
                result.unshift([node.tile, node.removed]);
            }
            else {
                result.unshift(node.tile);
            }
            node = node.parent;
        }
        return result;
    }
    topJumps(r) {
        if (!r.length) {
            return r;
        }
        r.sort((a, b) => b.depth - a.depth);
        const d = r[0].depth;
        return r.filter((t) => t.depth === d);
    }
    jumpsPossible() {
        const o = other(this.player);
        return this.grid.tiles.reduce((r, t) => {
            if ((t).data !== this.player) {
                return r;
            }
            const leaves = this.multiJumps({ tile: t }, o);
            return r.concat(leaves);
        }, []);
    }
    multiJumps(parent, o, leaves = [], depth = 0, removed = []) {
        const t = parent.tile;
        parent.jumps = [];
        for (const [n, m] of t.links) {
            if (((m).data === o) && (removed.indexOf(m) === -1)) {
                const d = (m).links.get(n);
                if (d && !d.data) {
                    const r = { tile: d, removed: m, depth, parent };
                    parent.jumps.push(r);
                    this.multiJumps(r, o, leaves, depth + 1, removed.concat([m]));
                }
            }
        }
        if (!parent.jumps.length && depth) {
            leaves.push(parent);
        }
        return leaves;
    }
    jumpPossible(t, p, o) {
        const result = [];
        for (const [n, m] of t.links) {
            if ((m).data === o) {
                const d = (m).links.get(n);
                if (d && !d.data) {
                    result.push([t, [d, m]]);
                }
            }
        }
        return result;
    }
    simplePossible() {
        return this.grid.tiles.reduce((r, t) => {
            if ((t).data !== this.player) {
                return r;
            }
            for (const [n, m] of t.links) {
                if (!(m).data) {
                    r.push([t, m]);
                }
            }
            return r;
        }, []);
    }
}
//# sourceMappingURL=QirkatGameBase.js.map