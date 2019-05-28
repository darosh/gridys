import { AnyTile, IGrid } from '@gridy/core';
import { IGame } from '../../IGame';
import { Theme } from '../../Theme';
export declare class HexGameBase implements IGame {
    static theme: Theme;
    moves: any[];
    player: number;
    score?: {
        [player: number]: number;
    };
    winner: number;
    playerTiles: {
        [i: number]: AnyTile[];
    };
    moveToString: (move: import("../../IGridGame").Move) => string;
    stringToMove: (move: string) => import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep | (import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep)[] | null;
    undo: () => void;
    private grid;
    private tileMap;
    private freeTileMap;
    private finished;
    constructor(grid: IGrid<AnyTile>, lines?: number, skip?: number);
    possible(): any[];
    links(): any[];
    move(m: any): void;
    evaluate(): number;
    winning(): AnyTile[] | undefined;
    private getWinner;
    private markLine;
    private flood;
}
