import { AnyTile, IGrid } from 'gridy';
import { QuirkatBoard } from './QuirkatBoard';
export declare class QirkatGameBase extends QuirkatBoard {
    moveToString: any;
    stringToMove: any;
    score: {
        [player: number]: number;
    };
    finished: boolean;
    private maxMoves;
    constructor(grid: IGrid<AnyTile>, maxMoves: number);
    move(m: any): void;
    undo(): void;
    getWinner(): 0 | 1 | -1 | 2;
    possible(): any;
    private leavesToMoves(r);
    private leaveToMove(nodeInput);
    private topJumps(r);
    private jumpsPossible();
    private multiJumps(parent, o, leaves?, depth?, removed?);
    private jumpPossible(t, p, o);
    private simplePossible();
}
