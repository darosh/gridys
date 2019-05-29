import { IGridMappedGame, Move } from '../../../IGridGame';
export declare function moveToString(this: IGridMappedGame, move: Move): string;
export declare function stringToMove(this: IGridMappedGame, move: string): Move | null;
export declare function movesToString(this: IGridMappedGame, move: Move[]): string;
export declare function jumpsToString(this: IGridMappedGame, move: Move[]): string;
export declare function stringsToJump(this: IGridMappedGame, move: string): Move | null;
export declare function stringsToMove(this: IGridMappedGame, move: string): Move | null;
