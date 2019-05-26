import { AnyGrid } from '@gridy/core';
import { IGame } from '../../IGame';
import { Move } from '../../Move';
import { QuirkatBoard } from '../base/QuirkatBoard';
export declare class CatchTheHareGameBase extends QuirkatBoard implements IGame {
    static title: string;
    static group: string;
    static wiki: string;
    static location: string;
    static created: number;
    moveToString: any;
    stringToMove: any;
    jumpsPossible: any;
    multiJumps: any;
    leavesToMoves: any;
    leaveToMove: any;
    expandJumps: any;
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
    private possibleHunters(value);
    private possibleHare();
    private getWinner();
}
