import { Float3, link, toArray, toMap } from 'gridy';
import { Theme } from '../../Theme';
import { other } from '../../utils';
import { moveToString, stringToMove } from '../utils/serialization';
import { undo } from '../utils/undo';
export class HexGameBase {
    constructor(grid, lines = 3, skip = 2) {
        this.moves = [];
        this.player = 1;
        this.winner = 0;
        this.playerTiles = { 1: [], 2: [] };
        this.moveToString = moveToString.bind(this);
        this.stringToMove = stringToMove.bind(this);
        this.undo = undo.bind(this);
        this.finished = false;
        this.grid = grid;
        this.tileMap = toMap(grid.tiles);
        this.freeTileMap = toMap(grid.tiles);
        link(this.tileMap);
        this.markLine(this.grid.tile(0, 0), this.grid.tile(0, this.grid.y - 1), 1, 'begin');
        this.markLine(this.grid.tile(this.grid.x - 1, 0), this.grid.tile(this.grid.x - 1, this.grid.y - 1), 1, 'end');
        this.markLine(this.grid.tile(0, 0), this.grid.tile(this.grid.x - 1, 0), 2, 'begin');
        this.markLine(this.grid.tile(0, this.grid.y - 1), this.grid.tile(this.grid.x - 1, this.grid.y - 1), 2, 'end');
    }
    possible() {
        // throw new Error("Method not implemented.");
        if (this.finished) {
            return [];
        }
        return toArray(this.freeTileMap);
    }
    links() {
        return [
            [this.grid.tile(-1, 1), this.grid.tile(-1, this.grid.y - 1), 1],
            [this.grid.tile(this.grid.x, 0), this.grid.tile(this.grid.x, this.grid.y - 2), 1],
            [this.grid.tile(1, -1), this.grid.tile(this.grid.x - 1, -1), 2],
            [this.grid.tile(0, this.grid.y), this.grid.tile(this.grid.x - 2, this.grid.y), 2]
        ];
    }
    move(m) {
        m.data = this.player;
        this.playerTiles[this.player].push(m);
        this.player = other(this.player);
        this.moves.push(m);
        this.freeTileMap.delete(m.key);
        this.winner = this.getWinner();
        if ((this.moves.length === this.grid.tiles.length) || this.winner) {
            this.finished = true;
        }
    }
    evaluate() {
        throw new Error('Method not implemented.');
    }
    winning() {
        const tile = this.moves[this.moves.length - 1];
        const m = new Map([[tile.key, true]]);
        const a = [{ tile, previous: null }];
        const v = tile.data;
        let i = 0;
        let begin;
        let end;
        while (i < a.length) {
            const t = a[i].tile;
            if (t[`begin${v}`]) {
                begin = begin || a[i];
                // if (!end) {
                //   continue;
                // }
            }
            else if (t[`end${v}`]) {
                end = end || a[i];
                // if (!begin) {
                //   continue;
                // }
            }
            if (begin && end) {
                const result = [];
                let item = begin;
                while (item) {
                    result.push(item.tile);
                    item = item.previous;
                }
                item = end;
                const line = [];
                while (item) {
                    line.unshift(item.tile);
                    item = item.previous;
                }
                line.shift();
                return result.concat(line);
            }
            for (const [, n] of t.links) {
                if (n.data === v) {
                    if (!m.has(n.key)) {
                        a.push({ tile: n, previous: a[i] });
                        m.set(n.key, true);
                    }
                }
            }
            i++;
        }
    }
    getWinner() {
        if (!this.moves.length) {
            return 0;
        }
        const last = this.moves[this.moves.length - 1];
        const w = this.flood(last);
        if (w) {
            return last.data;
        }
        if (this.moves.length === this.grid.tiles.length) {
            return -1;
        }
        return 0;
    }
    markLine(fromTile, to, value, key) {
        Float3.LINE(fromTile, to).forEach((t) => {
            this.tileMap.get(t.toString())[`${key}${value}`] = true;
        });
    }
    flood(tile) {
        const m = new Map([[tile.key, true]]);
        const a = [tile];
        const v = tile.data;
        let i = 0;
        let begin = false;
        let end = false;
        while (i < a.length) {
            const t = a[i];
            if (t[`begin${v}`]) {
                begin = true;
                // if (!end) {
                //   continue;
                // }
            }
            else if (t[`end${v}`]) {
                end = true;
                // if (!begin) {
                //   continue;
                // }
            }
            if (begin && end) {
                return true;
            }
            for (const [, n] of t.links) {
                if (n.data === v) {
                    if (!m.has(n.key)) {
                        a.push(n);
                        m.set(n.key, true);
                    }
                }
            }
            i++;
        }
        return false;
    }
}
HexGameBase.theme = Theme.Hex;
//# sourceMappingURL=HexGameBase.js.map