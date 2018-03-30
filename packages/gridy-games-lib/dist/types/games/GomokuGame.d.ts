import { MinimaxPlayer } from '../players/MinimaxPlayer';
import { ConnectGameBase } from './base/ConnectGameBase';
export declare class GomokuGame extends ConnectGameBase {
    static title: string;
    static group: string;
    static wiki: string;
    static location: string;
    static created: number;
    static rules: string[];
    static sample: string;
    constructor();
    static player: () => MinimaxPlayer;
}
