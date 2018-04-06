export class AlphaBetaPlayer {
    constructor(depth = 3) {
        this.count = 0;
        this.hit = 0;
        this.depth = 0;
        this.depth = depth;
    }
    select(game) {
        return { move: this.move(game, this.depth), count: this.count, hit: this.hit };
    }
    move(game, depth, isMaximisingPlayer = true) {
        this.count = 0;
        const newGameMoves = game.possible();
        let bestMove = -Infinity;
        let bestMoveFound;
        for (const newGameMove of newGameMoves) {
            game.move(newGameMove);
            const value = this.minimax(depth - 1, game, -Infinity, Infinity, !isMaximisingPlayer);
            game.undo();
            if (value > bestMove) {
                bestMove = value;
                bestMoveFound = newGameMove;
            }
        }
        return bestMoveFound;
    }
    minimax(depth, game, inputAlpha, inputBeta, isMaximisingPlayer) {
        this.count++;
        if (depth === 0) {
            return game.evaluate();
        }
        const newGameMoves = game.possible();
        let alpha = inputAlpha;
        let beta = inputBeta;
        if (isMaximisingPlayer) {
            let bestMove = -Infinity;
            for (const newGameMove of newGameMoves) {
                game.move(newGameMove);
                bestMove = Math.max(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
                game.undo();
                alpha = Math.max(alpha, bestMove);
                if (beta <= alpha) {
                    this.hit++;
                    return bestMove;
                }
            }
            return bestMove;
        }
        else {
            let bestMove = Infinity;
            for (const newGameMove of newGameMoves) {
                game.move(newGameMove);
                bestMove = Math.min(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
                game.undo();
                beta = Math.min(beta, bestMove);
                if (beta <= alpha) {
                    this.hit++;
                    return bestMove;
                }
            }
            return bestMove;
        }
    }
}
//# sourceMappingURL=AlphaBetaPlayer.js.map