import { link, toMap } from '@gridy/core';
import { Theme } from '../../Theme';
import { other } from '../../utils';
import { connections, winning } from '../utils/connect';
import { movesToString, stringsToMove } from '../utils/serialization';
export class TacTickleGameBase {
    constructor(grid, min = 3, directions, lines) {
        this.moves = [];
        this.player = 1;
        this.winner = 0;
        this.playerTiles = { 1: [], 2: [] };
        this.moveToString = movesToString.bind(this);
        this.stringToMove = stringsToMove.bind(this);
        this.finished = false;
        this.grid = grid;
        this.tileMap = toMap(grid.tiles);
        link(this.tileMap);
        this.min = min;
        this.init(lines);
        this.directions = directions.map(([d]) => d);
    }
    possible() {
        // throw new Error("Method not implemented.");
        if (this.finished) {
            return [];
        }
        return this.grid.tiles.reduce((r, t) => {
            if (t.data !== this.player) {
                return r;
            }
            for (const [dir, nei] of t.links) {
                if (!nei.data && (this.directions.indexOf(dir) > -1)) {
                    r.push([t, nei]);
                }
            }
            return r;
        }, []);
    }
    move(m) {
        m[1].data = m[0].data;
        m[0].data = null;
        this.player = other(this.player);
        this.moves.push(m);
        const w = connections(m[1], m[1].data, this.min);
        if (w) {
            this.finished = true;
            this.winner = m[1].data;
        }
        else if (this.moves.length === (this.grid.tiles.length * 2)) {
            this.finished = true;
            this.winner = -1;
        }
    }
    undo() {
        const move = this.moves.pop();
        move[0].data = move[1].data;
        move[1].data = null;
        this.player = other(this.player);
        this.finished = false;
        this.winner = 0;
    }
    evaluate() {
        throw new Error('Method not implemented.');
    }
    winning() {
        const m = this.moves[this.moves.length - 1];
        return winning(m[1], m[1].data, this.min);
    }
    init(lines = [[0, 0, 1], [0, this.grid.y - 1, 0]]) {
        for (const [xx, y, skip] of lines) {
            for (let x = xx; x < xx + 4; x++) {
                const t = this.tileMap.get(this.grid.tile(x, y).key);
                const p = (x + skip) % 2 + 1;
                if (!t) {
                    continue;
                }
                t.data = p;
                // this.playerTiles[p].push(t);
            }
        }
    }
}
TacTickleGameBase.theme = Theme.TacTickle;
TacTickleGameBase.move = true;
//# sourceMappingURL=TacTickleGameBase.js.map