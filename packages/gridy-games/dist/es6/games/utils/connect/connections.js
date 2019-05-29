export function connections(move, player, min) {
    const done = {};
    for (const [n, m] of move.links) {
        // const opposite = move.opposite ? move.opposite(n) : -n;
        const opposite = -n;
        if (!done[opposite]) {
            done[opposite] = true;
            let o = m;
            let v = 1;
            while (o && (o.data === player)) {
                v++;
                o = o.links.get(n);
                o = (o !== move) ? o : false;
            }
            o = (move).links.get(opposite);
            while (o && (o.data === player)) {
                v++;
                o = o.links.get(opposite);
                o = (o !== move) ? o : false;
            }
            if (v >= min) {
                return true;
            }
        }
    }
}
//# sourceMappingURL=connections.js.map