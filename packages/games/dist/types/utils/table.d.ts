import { IGridGameConstructor } from '../IGridGame';
export declare const FIELDS: string[];
export interface IDictionary {
    [k: string]: any;
}
export declare function table(games: {
    [name: string]: IGridGameConstructor;
}, wip?: boolean): IDictionary[];
