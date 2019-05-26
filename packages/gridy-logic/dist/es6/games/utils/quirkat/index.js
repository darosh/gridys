import { other } from '../../../utils';
export function isDiagonalCenter(a, b) {
    return isDiagonal(a, b) && (isCenter(a) || isCenter(b));
}
function isDiagonal(a, b) {
    return (a.x !== b.x && a.y !== b.y);
}
function isCenter(a) {
    return ((a.x % 2) && !(a.y % 2));
}
export function quirkatSetup(tiles) {
    let i = 0;
    const mid = (tiles.length - 1) / 2;
    for (const t of tiles) {
        if (i < mid) {
            t.data = 1;
        }
        else if (i > mid) {
            t.data = 2;
        }
        i++;
    }
}
export function jumpsPossible() {
    const o = other(this.player);
    return this.grid.tiles.reduce((r, t) => {
        if ((t).data !== this.player) {
            return r;
        }
        const leaves = this.multiJumps({ tile: t }, o);
        return r.concat(leaves);
    }, []);
}
export function multiJumps(parent, o, leaves = [], depth = 0, removed = []) {
    const t = parent.tile;
    parent.jumps = [];
    if (!removed.length) {
        removed.push(t);
    }
    for (const [n, m] of t.links) {
        if (((m).data === o) && (removed.indexOf(m) === -1)) {
            const d = (m).links.get(n);
            if (d && (!d.data || (removed.indexOf(d) > -1))) {
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
export function leavesToMoves(r) {
    return r.map(this.leaveToMove);
}
export function leaveToMove(nodeInput) {
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
export function expandJumps(leaves) {
    return leaves.reduce((r, t) => {
        let node = t;
        while (node.parent) {
            r.push(node);
            node = node.parent;
        }
        return r;
    }, []);
}
//# sourceMappingURL=index.js.map