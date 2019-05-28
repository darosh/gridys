import { AnyTile, Directions, IGrid } from '@gridy/core';
import { IGame } from '../../IGame';
import { Theme } from '../../Theme';
export declare class TacTickleGameBase implements IGame {
    static theme: Theme;
    static move: boolean;
    moves: any[];
    player: number;
    score?: {
        [player: number]: number;
    };
    winner: number;
    playerTiles: {
        [i: number]: AnyTile[];
    };
    grid: IGrid<AnyTile>;
    moveToString: (move: import("../../IGridGame").Move[]) => string;
    stringToMove: (move: string) => import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep | (import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep)[] | null;
    private tileMap;
    private min;
    private directions;
    private finished;
    constructor(grid: IGrid<AnyTile>, min: number | undefined, directions: Directions<any>, lines?: any);
    possible(): any[];
    move(m: any): void;
    undo(): void;
    evaluate(): number;
    winning(): AnyTile[] | undefined;
    private init;
}
