import { Radial8Tile, RadialGrid, Shape } from 'gridy';
import { Theme } from '../Theme';
import { ConnectGameBase } from './base/ConnectGameBase';
export class TicTacToeRoundGame extends ConnectGameBase {
    constructor() {
        const grid = new RadialGrid(1, true, Shape.Even, 3, 4, Radial8Tile, 1);
        super(grid, 3);
    }
}
TicTacToeRoundGame.title = 'Tic Tac Toe Round';
TicTacToeRoundGame.theme = Theme.Hex;
TicTacToeRoundGame.group = 'Connect';
TicTacToeRoundGame.original = 'TicTacToeGame';
TicTacToeRoundGame.sample = 'c3, a4, b3, a3, a2, b4, c4';
//# sourceMappingURL=TicTacToeRoundGame.js.map