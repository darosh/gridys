import { AnyTile, IGrid } from '@gridy/core';
import { IGame } from '../../IGame';
import { IGameTile } from '../../IGridGame';
import { Move } from '../../Move';
import { Theme } from '../../Theme';
export declare class ConnectGameBase implements IGame {
    static theme: Theme;
    grid: IGrid<IGameTile>;
    min: number;
    moves: Move[];
    player: number;
    winner: number;
    tileMap: Map<string, AnyTile>;
    finished: boolean;
    playerTiles: {
        [i: number]: AnyTile[];
    };
    freeTileMap: Map<string, AnyTile>;
    moveToString: (move: import("../../IGridGame").Move) => string;
    stringToMove: (move: string) => IGameTile | import("../../IGridGame").ICompoundStep | (IGameTile | import("../../IGridGame").ICompoundStep)[] | null;
    undo: () => void;
    constructor(grid: IGrid<IGameTile>, min: number);
    init(record: string): void;
    possible(): any[];
    move(m: Move): void;
    evaluate(): number;
    getWinner(): number;
    winning(): AnyTile[] | undefined;
}
