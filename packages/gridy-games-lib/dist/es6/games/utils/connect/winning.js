export function winning(move, player, min) {
    const done = {};
    for (const n of move.links) {
        if (done[-n[0]]) {
            continue;
        }
        const result = [move];
        done[-n[0]] = true;
        const v = getWinning(n, player, result, move);
        if (v >= min) {
            return result;
        }
    }
}
function getWinning(n, player, result, move) {
    let o = n[1];
    let v = 1;
    while (o && (o.data === player)) {
        result.push(o);
        v++;
        o = o.links.get(n[0]);
        o = (o !== move) ? o : false;
    }
    o = (move).links.get(-n[0]);
    while (o && (o.data === player)) {
        result.unshift(o);
        v++;
        o = o.links.get(-n[0]);
        o = (o !== move) ? o : false;
    }
    return v;
}
//# sourceMappingURL=winning.js.map