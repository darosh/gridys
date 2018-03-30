import { ICompoundStep, IGameTile, IGridGame, Move } from '../IGridGame';
export declare function getMovePlace(move: Move, cursor?: number): IGameTile | undefined;
export declare function initHighlight(game: IGridGame): void;
export declare function initActions(game: IGridGame, moves: Move[], cursorInput?: number): void;
export declare function selectAction(game: IGridGame, tile: IGameTile): false | IGameTile | ICompoundStep | (IGameTile | ICompoundStep)[] | undefined;
export declare function undoAction(game: IGridGame): void;
