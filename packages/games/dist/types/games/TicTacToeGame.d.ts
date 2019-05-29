import { Theme } from '../Theme';
import { ConnectGameBase } from './base/ConnectGameBase';
export declare class TicTacToeGame extends ConnectGameBase {
    static title: string;
    static theme: Theme;
    static group: string;
    static aliases: string[];
    static created: number;
    static location: string;
    static wiki: string;
    static rules: string[];
    static sample: string;
    constructor();
}
