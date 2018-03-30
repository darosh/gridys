import { link, toArray, toMap } from 'gridy';
import { Theme } from '../../Theme';
import { other, parseRecord } from '../../utils';
import { connections, evaluateLinked, winning } from '../utils/connect';
import { moveToString, stringToMove } from '../utils/serialization';
import { undo } from '../utils/undo';
export class ConnectGameBase {
    constructor(grid, min) {
        this.moves = [];
        this.player = 1;
        this.winner = 0;
        this.finished = false;
        this.playerTiles = {};
        this.moveToString = moveToString.bind(this);
        this.stringToMove = stringToMove.bind(this);
        this.undo = undo.bind(this);
        this.grid = grid;
        this.min = min;
        this.tileMap = toMap(this.grid.tiles);
        this.freeTileMap = toMap(this.grid.tiles);
        link(this.tileMap);
    }
    init(record) {
        const moves = parseRecord(record);
        for (const move of moves) {
            this.move(this.tileMap.get(this.grid.tile(move[0], move[1]).key));
        }
    }
    possible() {
        if (this.finished) {
            return [];
        }
        // const arr = toArray(this.freeTileMap) as any;
        // for (const t of arr) {
        //   t.sort = 0;
        //   for (const n of t.links.values()) {
        //     t.sort += n.data ? 1 : 0;
        //   }
        // }
        // arr.sort((a: any, b: any) => (a.sort - b.sort));
        // return arr;
        return toArray(this.freeTileMap);
    }
    move(m) {
        m.data = this.player;
        (this.playerTiles[this.player] || (this.playerTiles[this.player] = [])).push(m);
        this.player = other(this.player);
        this.moves.push(m);
        this.freeTileMap.delete(m.key);
        this.winner = this.getWinner();
        if ((this.moves.length === this.grid.tiles.length) || this.winner) {
            this.finished = true;
        }
    }
    evaluate() {
        const a = evaluateLinked(this.playerTiles[this.player] || [], this.min, this.player);
        const b = evaluateLinked(this.playerTiles[other(this.player)] || [], this.min, other(this.player));
        return a - b * this.min;
    }
    getWinner() {
        const w = connections(this.moves[this.moves.length - 1], other(this.player), this.min);
        if (w) {
            return other(this.player);
        }
        return this.moves.length === this.grid.tiles.length ? -1 : 0;
    }
    winning() {
        const m = this.moves[this.moves.length - 1];
        return winning(m, m.data, this.min);
    }
}
ConnectGameBase.theme = Theme.Gomoku;
//# sourceMappingURL=ConnectGameBase.js.map