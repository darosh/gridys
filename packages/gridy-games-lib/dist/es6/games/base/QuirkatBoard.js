import { link, toMap } from 'gridy';
import { Theme } from '../../Theme';
import { isDiagonalCenter } from '../utils/quirkat';
export class QuirkatBoard {
    constructor(grid) {
        this.moves = [];
        this.player = 1;
        this.scale = 1;
        this.winner = 0;
        this.grid = grid;
        this.tileMap = toMap(this.grid.tiles);
        link(this.tileMap);
        for (const t of this.grid.tiles) {
            for (const [n, m] of (t).links) {
                if (isDiagonalCenter(m, t)) {
                    t.links.delete(n);
                    m.links.delete(-n);
                }
            }
        }
    }
    rulers() {
        const m = new Map();
        for (const t of this.grid.tiles) {
            for (const l of (t).links) {
                const keys = [t.key, l[1].key];
                keys.sort();
                m.set(keys.toString(), [t, l[1]]);
            }
        }
        return Array.from(m.values());
    }
    dots() {
        return this.grid.tiles;
    }
}
QuirkatBoard.theme = Theme.Qirkat;
QuirkatBoard.move = true;
//# sourceMappingURL=QuirkatBoard.js.map