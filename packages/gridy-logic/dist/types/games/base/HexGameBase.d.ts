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
    moveToString: any;
    stringToMove: any;
    undo: any;
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
    private getWinner();
    private markLine(fromTile, to, value, key);
    private flood(tile);
}
