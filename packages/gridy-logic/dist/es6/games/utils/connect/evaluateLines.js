import { toMap } from '@gridy/core';
function mapped(available, selection) {
    return selection.filter((t) => available.has(t[1].key))
        .map((t) => [t[0], available.get(t[1].key)]);
}
export function evaluateLines(t1, free, min) {
    let c = 0;
    const a1 = toMap(t1);
    for (const t of t1) {
        const m = new Map(mapped(a1, t.neighbors()));
        const s = Array.from(m.keys()).filter((k) => (k > 0) && !m.has(t.opposite ? t.opposite(k) : -k));
        if (!s.length) {
            const mp = mapped(free, t.neighbors());
            c = Math.max(c, mp.length / 8);
            continue;
        }
        for (const k of s) {
            c = evaluate(c, a1, k, free, min, t);
        }
    }
    return c;
}
function evaluate(c, a1, k, free, min, t) {
    const l = [];
    let i = t;
    while (i) {
        l.push(i);
        i = new Map(mapped(a1, i.neighbors())).get(k);
    }
    const v = l.length;
    if (v === min) {
        return Infinity;
    }
    let f = 0;
    i = new Map(mapped(free, l[0].neighbors())).get(-k);
    if (i) {
        f++;
    }
    i = new Map(mapped(free, l[l.length - 1].neighbors())).get(k);
    if (i) {
        f++;
    }
    if (!f) {
        return c;
    }
    return Math.max(c, Math.pow(min, v) - Math.pow(min, v - 1) * (2 - f));
}
//# sourceMappingURL=evaluateLines.js.map