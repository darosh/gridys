import { MinimaxPlayer } from '../players/MinimaxPlayer';
import { ConnectGameBase } from './base/ConnectGameBase';
export declare class FourInARow11Game extends ConnectGameBase {
    static title: string;
    static group: string;
    static rules: string[];
    static wiki: string;
    static sample: string;
    constructor();
    static player: () => MinimaxPlayer;
}
