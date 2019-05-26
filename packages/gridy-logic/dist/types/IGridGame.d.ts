import { AnyTile, IGrid } from '@gridy/core';
export declare type TileData = number | string | null | undefined;
export interface IGameTile extends AnyTile {
    data: TileData;
    updated: TileData;
    highlighted: boolean;
    selected: boolean;
    actions?: IAction[];
}
/**
 * AnyTile single placement
 * [AnyTile, AnyTile] simple move
 * [AnyTile, AnyTile, AnyTile] double move
 * [AnyTile, [AnyTile, [removed]] move + removed
 * [[AnyTile, undefined, modified] move + modified
 */
export declare enum Phase {
    PLACE = 0,
    REMOVED = 1,
    MODIFIED = 2,
}
export declare type Step = (IGameTile | ICompoundStep);
export declare type Move = Step | Step[];
export interface ICompoundStep extends Array<IGameTile | IGameTile[] | undefined> {
    [Phase.PLACE]: IGameTile;
    [Phase.REMOVED]?: IGameTile | IGameTile[];
    [Phase.MODIFIED]?: IGameTile | IGameTile[];
}
export interface IAction {
    cursor: number;
    move: Move;
}
export interface IGameState {
    highlighted?: IGameTile[];
    selected?: IGameTile[];
    updated?: IGameTile[];
}
export interface IGridGame {
    /**
     * IGrid instance containing tiles used for visual and logic via IGameTile data and AnyTile neighbors
     */
    grid: IGrid<IGameTile>;
    scale?: number;
    /**
     * Force landscape mode
     */
    landscape?: boolean;
    /**
     * Show surrounding hull
     */
    hull?: boolean;
    actions?: IGameState[];
    /**
     * Get winning tiles to be highlighted
     */
    winning?(): IGameTile[];
    /**
     * Get winning tiles to be highlighted
     */
    rulers?(): IGameTile[];
    links?(): IGameTile[];
    moveToString?(move: any): string;
}
export interface IGridMappedGame extends IGridGame {
    tileMap: Map<string, IGameTile>;
    freeTileMap: Map<string, IGameTile>;
    playerTiles: {
        [i: number]: IGameTile[];
    };
    finished: boolean;
}
/**
 * Game metadata
 */
export interface IGridGameConstructor {
    title: string;
    group: string;
    authors?: string[];
    aliases?: string[];
    original?: string;
    rules?: string[];
    /**
     * Created year
     */
    created?: number;
    location?: string;
    wiki?: string;
    source?: string;
    /**
     * Force landscape mode
     */
    landscape?: boolean;
    /**
     * Work in progress
     */
    wip?: boolean;
    new (): IGridGame;
}
