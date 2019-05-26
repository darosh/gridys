import { UctNode, UctPlayer } from './UctPlayer';
// tslint:disable-next-line:max-classes-per-file
export class UctCachedPlayer extends UctPlayer {
    constructor(maxTime = 400, maxIterations = 8192, blockSize = 8) {
        super(maxTime, maxIterations, blockSize);
    }
    select(game) {
        const root = this.getRoot(game) || new UctNode(game);
        const startTime = Date.now();
        const timeLimit = startTime + this.maxTime;
        const nodesVisited = this.iterate(game, root, timeLimit);
        this.cachedRoot = root.mostVisitedChild();
        return {
            duration: Date.now() - startTime,
            move: this.cachedRoot.action,
            nodesVisited
        };
    }
    getRoot(game) {
        if (!this.cachedRoot || this.cachedRoot.depth >= game.moves.length) {
            return;
        }
        for (let i = this.cachedRoot.depth; i < game.moves.length; i++) {
            this.cachedRoot = this.cachedRoot.children.find((c) => c.action === game.moves[i]);
            if (!this.cachedRoot) {
                return;
            }
        }
        return this.cachedRoot;
    }
}
//# sourceMappingURL=UctCachedPlayer.js.map