import { link, toMap } from '@gridy/core';
import { Theme } from '../../Theme';
import { other } from '../../utils';
import { moveToString, stringToMove } from '../utils/serialization';
export class ReversiGameBase {
    constructor(grid, center = false, anti = false) {
        this.player = 1;
        this.moves = [];
        this.score = { 1: 0, 2: 0 };
        this.winner = 0;
        this.moveToString = moveToString.bind(this);
        this.stringToMove = stringToMove.bind(this);
        this.finished = false;
        this.history = [];
        this.anti = anti;
        this.grid = grid;
        this.tileMap = toMap(grid.tiles);
        const x1 = Math.floor(grid.x / 2 - 0.5);
        const x2 = Math.ceil(grid.x / 2 - 0.5);
        const y1 = Math.floor(grid.y / 2 - 0.5);
        const y2 = Math.ceil(grid.y / 2 - 0.5);
        this.center = [
            this.tileMap.get(grid.tile(x1, y1).key),
            this.tileMap.get(grid.tile(x1, y2).key),
            this.tileMap.get(grid.tile(x2, y2).key),
            this.tileMap.get(grid.tile(x2, y1).key)
        ];
        this.empty = toMap(this.grid.tiles);
        link(this.tileMap);
        if (center) {
            this.center.forEach((t) => {
                this.move(t, true);
            });
        }
        this.updatePossible();
    }
    possible() {
        return this.knownPossible;
    }
    updatePossible() {
        this.knownPossible = this.possibleFor(this.player);
        if (!this.knownPossible.length) {
            if (this.possibleFor(other(this.player)).length) {
                this.move(null);
            }
            else {
                this.finished = true;
            }
        }
    }
    possibleFor(pl) {
        const r = [];
        if ((this.grid.tiles.length - this.empty.size) < 4) {
            return this.center.filter((t) => !t.data);
        }
        for (const m of this.empty.values()) {
            for (const d of (m).links.keys()) {
                let node = (m).links.get(d);
                let nodes = 0;
                while (node && node.data && (node.data !== pl)) {
                    nodes++;
                    node = node.links.get(d);
                }
                if (nodes && node && (node.data === pl)) {
                    r.push(m);
                    break;
                }
            }
        }
        return r;
    }
    undo() {
        const m = this.moves.pop();
        this.finished = false;
        this.winner = 0;
        if (!m) {
            this.player = other(this.player);
            this.history.pop();
            this.undo();
            return;
        }
        this.score[m.data]--;
        m.data = null;
        this.empty.set(m.key, m);
        const h = this.history.pop();
        this.player = other(this.player);
        for (const k of Object.keys(h)) {
            const d = (this.tileMap.get(k));
            this.score[d.data]--;
            d.data = h[k];
            this.score[d.data]++;
        }
        this.updatePossible();
    }
    move(m, fake = false) {
        if (!m) {
            this.movePass(m);
            return;
        }
        m.data = this.player;
        this.score[this.player] = this.score[this.player] || 0;
        this.score[this.player]++;
        this.player = other(this.player);
        this.empty.delete(m.key);
        if (fake) {
            return;
        }
        this.moves.push(m);
        const state = this.getState(m);
        this.history.push(state);
        this.updatePossible();
        this.winner = this.getWinner();
    }
    evaluate() {
        return -this.score[this.player] + this.score[other(this.player)];
    }
    getWinner() {
        return !this.finished
            ? 0
            : this.score[1] === this.score[2]
                ? -1
                : this.score[1] > this.score[2]
                    ? this.anti ? 2 : 1
                    : this.anti ? 1 : 2;
    }
    movePass(m) {
        this.player = other(this.player);
        this.moves.push(m);
        this.history.push({});
        this.updatePossible();
        this.winner = this.getWinner();
    }
    getState(m) {
        const state = {};
        for (const d of m.links.keys()) {
            let node = m.links.get(d);
            const nodes = [];
            while (node && node.data && node.data !== m.data) {
                nodes.push(node);
                node = node.links.get(d);
            }
            if (node && (node.data === m.data)) {
                for (const n of nodes) {
                    state[n.key] = n.data;
                    this.score[n.data]--;
                    this.score[m.data]++;
                    n.data = m.data;
                }
            }
        }
        return state;
    }
}
ReversiGameBase.theme = Theme.Reversi;
//# sourceMappingURL=ReversiGameBase.js.map