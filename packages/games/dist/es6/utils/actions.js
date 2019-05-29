export function getMovePlace(move, cursor = 0) {
    if (Array.isArray(move)) {
        if (Array.isArray(move[cursor])) {
            return move[cursor][0];
        }
        else {
            return move[cursor];
        }
    }
    else if (!cursor) {
        return move;
    }
}
export function initHighlight(game) {
    for (const tile of game.grid.tiles) {
        tile.highlighted = false;
    }
}
export function initActions(game, moves, cursorInput = 0) {
    const highlighted = [];
    for (const move of moves) {
        let cursor = cursorInput;
        let tile = getMovePlace(move, cursor);
        if (!tile) {
            cursor--;
            tile = getMovePlace(move, cursor);
        }
        tile.actions = tile.actions || [];
        tile.actions.push({ move, cursor: cursor + 1 });
        if (!tile.highlighted) {
            tile.highlighted = true;
            highlighted.push(tile);
        }
    }
    game.actions = !cursorInput ? [] : game.actions;
    game.actions.push({ highlighted });
}
export function selectAction(game, tile) {
    if (tile.actions) {
        return getAction(game, tile.actions);
    }
    else {
        return false;
    }
}
export function undoAction(game) {
    let h;
    // tslint:disable-next-line:no-conditional-assignment
    while (h = game.actions && game.actions.pop()) {
        if (h.highlighted) {
            for (const i of h.highlighted) {
                i.highlighted = false;
                i.actions = undefined;
            }
        }
    }
}
function getAction(game, actions) {
    if (actions.length === 1) {
        const action = actions[0];
        const place = getMovePlace(action.move, action.cursor);
        if (!place) {
            return action.move;
        }
        undoAction(game);
        initActions(game, [action.move], action.cursor);
    }
    else {
        const moves = actions.map((a) => a.move);
        const action = actions[0];
        undoAction(game);
        initActions(game, moves, action.cursor);
    }
}
//# sourceMappingURL=actions.js.map