import { AnyGrid } from '@gridy/core';
import { IGame } from '../../IGame';
import { Move } from '../../Move';
import { QuirkatBoard } from '../base/QuirkatBoard';
import { expandJumps, leaveToMove, leavesToMoves } from '../utils/quirkat';
export declare class CatchTheHareGameBase extends QuirkatBoard implements IGame {
    static title: string;
    static group: string;
    static wiki: string;
    static location: string;
    static created: number;
    moveToString: (move: import("../../IGridGame").Move[]) => string;
    stringToMove: (move: string) => import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep | (import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep)[] | null;
    jumpsPossible: () => any[];
    multiJumps: (parent: any, o: number, leaves?: any[] | undefined, depth?: number | undefined, removed?: any[] | undefined) => any[];
    leavesToMoves: typeof leavesToMoves;
    leaveToMove: typeof leaveToMove;
    expandJumps: typeof expandJumps;
    score: {
        [player: number]: number;
    };
    private finished;
    private maxMoves;
    constructor(grid: AnyGrid, maxMoves: number);
    move(m: any): void;
    possible(): Move[];
    undo(): void;
    evaluate(): number;
    private possibleHunters;
    private possibleHare;
    private getWinner;
}
