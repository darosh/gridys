import { Rectangular8Tile, RectangularGrid, Shape } from '@gridy/core';
import { MinimaxPlayer } from '../players/MinimaxPlayer';
import { ConnectGameBase } from './base/ConnectGameBase';
export class Gomoku9Game extends ConnectGameBase {
    constructor() {
        super(new RectangularGrid(1, false, Shape.Even, 9, 9, Rectangular8Tile), 5);
    }
}
Gomoku9Game.title = 'Gomoku 9x9';
Gomoku9Game.group = 'Connect';
Gomoku9Game.original = 'GomokuGame';
// tslint:disable-next-line:max-line-length
Gomoku9Game.sample = 'e5, e4, d6, f4, d5, d4, c4, g4, h4, f5, e6, b3, f7, g8, h5, f6, g6, e8, h7, h6, c7, b8, c5, c6, e7, d7, b4, f8, a3';
Gomoku9Game.player = () => new MinimaxPlayer(2);
//# sourceMappingURL=Gomoku9Game.js.map
