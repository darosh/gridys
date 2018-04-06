import { Rectangular8Tile, RectangularGrid, Shape } from 'gridy';
import { Theme } from '../Theme';
import { ConnectGameBase } from './base/ConnectGameBase';
export class ConnectFourGame extends ConnectGameBase {
    constructor() {
        super(new RectangularGrid(1, false, Shape.Even, 7, 6, Rectangular8Tile), 4);
        this.landscape = true;
    }
    possible() {
        if (this.finished) {
            return [];
        }
        const moves = [];
        for (let x = 0; x < this.grid.x; x++) {
            for (let y = 0; y < this.grid.y; y++) {
                const m = this.tileMap.get([x, y].toString());
                if (!m.data) {
                    moves.push(m);
                    break;
                }
            }
        }
        return moves;
    }
}
ConnectFourGame.title = 'Connect Four';
ConnectFourGame.theme = Theme.Plastic;
ConnectFourGame.group = 'Connect';
ConnectFourGame.authors = ['Howard Wexler', 'Ned Strongin'];
ConnectFourGame.created = 1974;
ConnectFourGame.wiki = 'https://en.wikipedia.org/wiki/Connect_Four';
ConnectFourGame.aliases = ['Captain\'s Mistress', 'Four Up', 'Gravitrips'];
ConnectFourGame.rules = ['Connect four pieces'];
ConnectFourGame.sample = 'c1, d1, c2, e1, b1, f1, g1, d2, d3, c3, e2, e3, e4';
//# sourceMappingURL=ConnectFourGame.js.map