import { IGame } from '../../IGame';
import { Theme } from '../../Theme';
export declare class MorrisGameBase implements IGame {
    static theme: Theme;
    static move: boolean;
    moves: any[];
    player: number;
    score?: {
        [player: number]: number;
    };
    winner: number;
    hull: boolean;
    private grid;
    private men;
    private tileMap;
    constructor(squares?: number, center?: boolean, diagonals?: boolean, men?: number);
    rulers(): any[];
    possible(): any[];
    move(m: any): void;
    undo(): void;
    evaluate(): number;
}
