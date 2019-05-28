import { HexagonalGrid, normalize, rotate } from '@gridy/core';
export const PASS = 'pass';
export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
export function last(a) {
    return a[a.length - 1];
}
export function isEmpty(a) {
    return !a || !a.length;
}
export function playout(game, players) {
    while (!game.winner && game.possible().length) {
        game.move(players[game.moves.length % players.length].select(game).move);
    }
}
export function parseRecord(record) {
    const tokens = [];
    const records = record.replace(/[^0-9a-z]+/, '').replace(/([0-9])([a-z])/g, '$1,$2').split(',');
    for (const r of records) {
        tokens.push(parsePosition(r));
    }
    return tokens;
}
export function parsePosition(r) {
    if (r === PASS) {
        return null;
    }
    else {
        const t = r.replace(/([a-z])([0-9])/g, '$1,$2').split(',');
        t[0] = parseInt(t[0], 36) - 10;
        t[1] = parseInt(t[1], 10) - 1;
        return t;
    }
}
export function parsePositions(r) {
    if (r === PASS) {
        return null;
    }
    else {
        const t = r.split('-');
        return t.map(parsePosition);
    }
}
export function stringifyPosition(position) {
    return `${String.fromCharCode(position.x + 97)}${(position.y + 1)}`;
}
export function stringifyPositions(positions) {
    return positions.map(stringifyPosition).join('-');
}
export function stringify(game) {
    return !game ? [] : game.moves.map((m) => game.moveToString(m));
}
export function other(player) {
    // if (!player) {
    //   throw new Error('Undefined player!');
    // }
    return 3 - player;
}
export function landscapeHex(grid) {
    rotate(grid, -1);
    grid.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS_YZ;
    grid.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE_YZ;
    normalize(grid);
    return grid;
}
export function reset(game) {
    while (game.moves.length) {
        game.undo();
    }
}
export function update(game, record) {
    if (!record) {
        return;
    }
    // .replace(/([0-9])([a-z])/g, "$1,$2")
    const records = record.replace(/[^0-9a-z-,]+/g, '').split(',');
    while (records.length > game.moves.length) {
        game.move(game.stringToMove(records[game.moves.length]));
    }
}
export function undoFor(game, player) {
    if ((game.player === player) && game.moves.length) {
        game.undo();
    }
    while ((game.player !== player) && game.moves.length) {
        game.undo();
    }
}
//# sourceMappingURL=utils.js.map