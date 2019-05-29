import { MinimaxPlayer } from '../players/MinimaxPlayer';
import { ConnectGameBase } from './base/ConnectGameBase';
export declare class Gomoku9Game extends ConnectGameBase {
    static title: string;
    static group: string;
    static original: string;
    static sample: string;
    constructor();
    static player: () => MinimaxPlayer;
}
