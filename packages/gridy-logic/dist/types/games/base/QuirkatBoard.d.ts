import { AnyTile, IGrid } from '@gridy/core';
import { Theme } from '../../Theme';
export declare class QuirkatBoard {
    static theme: Theme;
    static move: boolean;
    moves: any[];
    player: number;
    score?: {
        [player: number]: number;
    };
    scale: number;
    winner: number;
    grid: IGrid<AnyTile>;
    private tileMap;
    constructor(grid: IGrid<AnyTile>);
    rulers(): any[];
    dots(): AnyTile[];
}
