import { IGame } from '../IGame';
export declare class UctNode {
    action: any;
    parentNode?: UctNode;
    children: UctNode[];
    wins: number;
    visits: number;
    unexamined: UctNode[];
    activePlayer: number;
    depth: number;
    constructor(game: IGame, parentNode?: UctNode, action?: any);
    addChild(game: IGame, index: number): UctNode;
    selectChild(): UctNode | null;
    update(result: number): void;
    mostVisitedChild(): UctNode;
}
export declare class UctPlayer {
    maxIterations: number;
    maxTime: number;
    blockSize: number;
    constructor(maxTime?: number, maxIterations?: number, blockSize?: number);
    select(game: IGame): {
        duration: number;
        move: any;
        nodesVisited: number;
    };
    protected iterate(game: IGame, root: UctNode, timeLimit: number): number;
}
