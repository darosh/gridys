import { link, Rectangular8Tile, RectangularGrid, RectangularTile, Shape, toMap } from 'gridy';
import { Theme } from '../../Theme';
import { other } from '../../utils';
function unlink(tile, remove = false) {
    for (const k of tile.links.keys()) {
        if (tile.links.has(-k) && !remove) {
            const source = tile.links.get(-k);
            const target = tile.links.get(k);
            target.links.set(-k, source);
            source.links.set(k, target);
        }
        else {
            tile.links.get(k).links.delete(-k);
        }
    }
}
export class MorrisGameBase {
    constructor(squares = 3, center = false, diagonals = false, men = 9) {
        this.moves = [];
        this.player = 1;
        // public scale: number = 0.33;
        this.winner = 0;
        this.hull = true;
        const base = squares * 2 + 1;
        const mid = squares;
        const valid = [0, mid, base - 1];
        this.grid = new RectangularGrid(1, undefined, Shape.Even, base, base, diagonals
            ? Rectangular8Tile : RectangularTile);
        this.men = men;
        this.tileMap = toMap(this.grid.tiles);
        link(this.tileMap);
        this.grid.tiles = this.grid.tiles.filter((t) => {
            let v;
            let r;
            const x = Math.abs(t.x - mid);
            const y = Math.abs(t.y - mid);
            if (x === 0 && y === 0) {
                v = center;
                r = !center;
            }
            else {
                v = (x === y) || (center ? (((x === 0) || (y === 0))) : ((x === 0) ? !(y === 0) : (y === 0)));
            }
            if (!v) {
                unlink(t, r);
            }
            else if (x !== y) {
                for (const k of t.links.keys()) {
                    if (Math.abs(k) > 2) {
                        t.links.get(k).links.delete(-k);
                        t.links.delete(k);
                    }
                }
            }
            return v;
        });
    }
    rulers() {
        const m = new Map();
        for (const t of this.grid.tiles) {
            for (const l of t.links) {
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
    possible() {
        if (this.moves.length < (this.men * 2)) {
            return this.grid.tiles.filter((t) => !t.data);
        }
        return this.grid.tiles
            .filter((t) => t.data === this.player)
            .reduce((r, t) => {
            for (const [n, m] of t.links) {
                if (!m.data) {
                    r.push([t, m]);
                }
            }
            return r;
        }, []);
    }
    move(m) {
        if (!Array.isArray(m)) {
            m.data = this.player;
        }
        else {
            m[1].data = m[0].data;
            m[0].data = null;
        }
        this.player = other(this.player);
        this.moves.push(m);
    }
    undo() {
        throw new Error('Method not implemented.');
    }
    evaluate() {
        throw new Error('Method not implemented.');
    }
}
MorrisGameBase.theme = Theme.Mills;
MorrisGameBase.move = true;
//# sourceMappingURL=MorrisGameBase.js.map