import { IGame } from '../../../IGame';
import { IGridGame } from '../../../IGridGame';
export declare function isDiagonalCenter(a: any, b: any): boolean | 0;
export declare function quirkatSetup(tiles: any[]): void;
export declare function jumpsPossible(this: IGridGame & IGame): any[];
export declare function multiJumps(this: IGridGame & IGame, parent: any, o: number, leaves?: any[], depth?: number, removed?: any[]): any[];
export declare function leavesToMoves(this: any, r: any[]): {}[];
export declare function leaveToMove(this: any, nodeInput: any): any[];
export declare function expandJumps(this: any, leaves: any[]): any;
