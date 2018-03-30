import { Rectangular8Tile, RectangularGrid, Shape } from 'gridy';
import { Theme } from '../Theme';
import { ConnectGameBase } from './base/ConnectGameBase';
export class TicTacToeGame extends ConnectGameBase {
    constructor() {
        super(new RectangularGrid(1, false, Shape.Even, 3, 3, Rectangular8Tile), 3);
    }
}
TicTacToeGame.title = 'Tic Tac Toe';
TicTacToeGame.theme = Theme.Hex;
TicTacToeGame.group = 'Connect';
TicTacToeGame.aliases = ['Noughts and Crosses', 'Xs and Os', 'Exy-ozys'];
TicTacToeGame.created = -1300;
TicTacToeGame.location = 'Egypt';
TicTacToeGame.wiki = 'https://en.wikipedia.org/wiki/Tic-tac-toe';
TicTacToeGame.rules = ['Connect three pieces'];
TicTacToeGame.sample = 'b2, b3, a3, c1, c3, a2, a1';
//# sourceMappingURL=TicTacToeGame.js.map