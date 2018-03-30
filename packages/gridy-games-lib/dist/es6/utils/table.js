import { HexagonalGrid, RadialGrid, RectangularGrid, TriangularGrid } from 'gridy';
import { initActions } from './actions';
export const FIELDS = [
    'title',
    'type',
    'items',
    'linkText',
    'authors',
    'aliases',
    'rules',
    'created',
    'location',
    'tiles',
    'original',
    'grid'
];
const GRIDS = new Map([
    [RectangularGrid, 'Rectangular'],
    [HexagonalGrid, 'Hexagonal'],
    [RadialGrid, 'Radial'],
    [TriangularGrid, 'Triangular']
]);
function copy(name) {
    return Object.assign({}, name);
}
function domain(link) {
    return (/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/.exec((new URL(link)).hostname))[0];
}
function id(key) {
    return key.replace('Game', '');
}
const links = ['wiki', 'source'];
function merge(a, b) {
    for (const k of Object.keys(a)) {
        if (Array.isArray(a[k])) {
            a[`${k}Array`] = a[k];
            a[k] = a[k].join(', ');
        }
    }
    a.originals = getOriginals(a, b);
    links.forEach((l) => {
        if (a[l]) {
            a[`${l}Text`] = domain(a[l]);
        }
    });
    return a;
}
function getOriginals(a, b) {
    const originals = {};
    for (const k of Object.keys(b)) {
        if (a[k]) {
            continue;
        }
        if (Array.isArray(b[k])) {
            const n = `${k}Array`;
            b[n] = b[k];
            b[k] = b[k].join(', ');
            a[n] = b[n];
        }
        a[k] = b[k];
        originals[k] = true;
    }
    return originals;
}
export function table(games, wip = false) {
    const result = [];
    for (const key of Object.keys(games)) {
        const a = games[key];
        if (!wip && a.wip) {
            continue;
        }
        const m = row(a, games, key);
        Object.freeze(m);
        result.push(m);
    }
    return result;
}
function row(a, games, key) {
    const originalId = a.original;
    const b = (a.original ? games[a.original] : {});
    const m = merge(copy(a), copy(b));
    m.id = id(key);
    m.originalId = originalId ? id(originalId) : undefined;
    let instance;
    Object.defineProperty(m, 'instance', {
        // tslint:disable-next-line:no-reserved-keywords
        get() {
            if (instance) {
                return instance;
            }
            instance = new games[key]();
            initActions(instance, instance.possible());
            return Object.freeze(instance);
        }
    });
    Object.defineProperty(m, 'tiles', {
        // tslint:disable-next-line:no-reserved-keywords
        get() {
            return m.instance.grid.tiles.length;
        }
    });
    Object.defineProperty(m, 'grid', {
        // tslint:disable-next-line:no-reserved-keywords
        get() {
            return GRIDS.get(m.instance.grid.constructor);
        }
    });
    m.original = b.title || a.title;
    m.originals.original = !b.title;
    m.link = m.wiki || m.source;
    m.linkText = m.wikiText || m.sourceText;
    m.wip = a.wip;
    return m;
}
//# sourceMappingURL=table.js.map