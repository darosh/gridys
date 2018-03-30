import { Rectangular8Tile, RectangularGrid, Shape } from 'gridy';
import { MinimaxPlayer } from '../players/MinimaxPlayer';
import { ConnectGameBase } from './base/ConnectGameBase';
export class GomokuGame extends ConnectGameBase {
    constructor() {
        super(new RectangularGrid(1, false, Shape.Even, 15, 15, Rectangular8Tile), 5);
    }
}
GomokuGame.title = 'Gomoku';
GomokuGame.group = 'Connect';
GomokuGame.wiki = 'https://en.wikipedia.org/wiki/Gomoku';
GomokuGame.location = 'Japan';
GomokuGame.created = 990;
GomokuGame.rules = ['Connect five pieces'];
// tslint:disable-next-line:max-line-length
GomokuGame.sample = 'h8, h7, i8, g8, g9, i7, g7, i9, h9, f9, h10, h11, f8, i11, e7, d6, f6, e5, g5, h4, g10, j7, f11, e12, e9, h6, e10, d10, e8, e11, e6';
GomokuGame.player = () => new MinimaxPlayer(2);
//# sourceMappingURL=GomokuGame.js.map