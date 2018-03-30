import { Theme } from '../Theme';
import { ConnectGameBase } from './base/ConnectGameBase';
export declare class ConnectFourGame extends ConnectGameBase {
    static title: string;
    static theme: Theme;
    static group: string;
    static authors: string[];
    static created: number;
    static wiki: string;
    static alias: string[];
    static rules: string[];
    static sample: string;
    landscape: boolean;
    constructor();
    possible(): any[];
}
