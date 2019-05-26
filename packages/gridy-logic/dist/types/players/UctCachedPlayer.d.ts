import { IGame } from '../IGame';
import { UctPlayer } from './UctPlayer';
export declare class UctCachedPlayer extends UctPlayer {
    private cachedRoot?;
    constructor(maxTime?: number, maxIterations?: number, blockSize?: number);
    select(game: IGame): {
        duration: number;
        move: any;
        nodesVisited: number;
    };
    private getRoot(game);
}
