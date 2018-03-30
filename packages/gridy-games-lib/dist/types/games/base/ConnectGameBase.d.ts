import { AnyTile, IGrid } from 'gridy';
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
    moveToString: any;
    stringToMove: any;
    undo: any;
    constructor(grid: IGrid<IGameTile>, min: number);
    init(record: string): void;
    possible(): any[];
    move(m: Move): void;
    evaluate(): number;
    getWinner(): number;
    winning(): AnyTile[] | undefined;
}
