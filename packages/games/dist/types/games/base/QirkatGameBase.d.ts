import { AnyTile, IGrid } from '@gridy/core';
import { QuirkatBoard } from './QuirkatBoard';
export declare class QirkatGameBase extends QuirkatBoard {
    moveToString: (move: import("../../IGridGame").Move[]) => string;
    stringToMove: (move: string) => import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep | (import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep)[] | null;
    score: {
        [player: number]: number;
    };
    finished: boolean;
    private maxMoves;
    constructor(grid: IGrid<AnyTile>, maxMoves: number);
    move(m: any): void;
    undo(): void;
    getWinner(): 1 | 0 | -1 | 2;
    possible(): any;
    private leavesToMoves;
    private leaveToMove;
    private topJumps;
    private jumpsPossible;
    private multiJumps;
    private jumpPossible;
    private simplePossible;
}
