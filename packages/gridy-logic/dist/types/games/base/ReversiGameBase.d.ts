import { AnyTile, IGrid } from '@gridy/core';
import { IGame } from '../../IGame';
import { Move } from '../../Move';
import { Theme } from '../../Theme';
export interface IState {
    [index: string]: number;
}
export declare class ReversiGameBase implements IGame {
    static theme: Theme;
    grid: IGrid<AnyTile>;
    player: number;
    moves: Move[];
    score: {
        [index: number]: number;
    };
    winner: number;
    moveToString: (move: import("../../IGridGame").Move) => string;
    stringToMove: (move: string) => import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep | (import("../../IGridGame").IGameTile | import("../../IGridGame").ICompoundStep)[] | null;
    protected finished: boolean;
    protected tileMap: Map<string, AnyTile>;
    protected empty: Map<string, AnyTile>;
    protected history: IState[];
    protected center: any[];
    protected knownPossible?: any[];
    protected anti: boolean;
    constructor(grid: IGrid<AnyTile>, center?: boolean, anti?: boolean);
    possible(): any[];
    updatePossible(): void;
    possibleFor(pl: number): any[];
    undo(): void;
    move(m: any, fake?: boolean): void;
    evaluate(): number;
    getWinner(): number;
    private movePass;
    private getState;
}
