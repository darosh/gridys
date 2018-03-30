import { parsePosition, parsePositions, stringifyPosition, stringifyPositions } from '../../../utils/index';
export function moveToString(move) {
    if (!move) {
        return 'pass';
    }
    const p = this.grid.toPoint(move);
    return stringifyPosition(p);
}
export function stringToMove(move) {
    const p = parsePosition(move);
    if (!p) {
        return p;
    }
    const t = this.grid.tile.apply(this.grid, p);
    return this.tileMap.get(t.key);
}
export function movesToString(move) {
    if (!move) {
        return 'pass';
    }
    const p = (Array.isArray(move) ? move : [move]).map(this.grid.toPoint);
    return stringifyPositions(p);
}
export function jumpsToString(move) {
    if (!move) {
        return 'pass';
    }
    const p = (Array.isArray(move) ? move : [move]).reduce((r, t) => {
        const a = (Array.isArray(t) ? t.slice() : [t]);
        a.reverse();
        a.forEach((d) => r.push(d));
        return r;
    }, []).map(this.grid.toPoint);
    return stringifyPositions(p);
}
export function stringsToJump(move) {
    const p = parsePositions(move);
    if (!p) {
        return p;
    }
    const m = [getTile.call(this, p.shift())];
    if (p.length === 1) {
        m.push(getTile.call(this, p.shift()));
    }
    else {
        while (p.length) {
            const b = getTile.call(this, p.shift());
            const a = getTile.call(this, p.shift());
            m.push([a, b]);
        }
    }
    return m;
}
function getTile(t) {
    return this.tileMap.get(this.grid.tile.apply(this.grid, t).key);
}
export function stringsToMove(move) {
    const p = parsePositions(move);
    if (!p) {
        return p;
    }
    return p.map((pp) => {
        const t = this.grid.tile.apply(this.grid, pp);
        return this.tileMap.get(t.key);
    });
}
//# sourceMappingURL=index.js.map