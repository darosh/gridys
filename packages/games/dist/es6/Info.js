import * as games from './games';
import { table } from './utils';
// tslint:disable:no-unnecessary-class function-name
export class Info {
    static set wip(value) {
        if (value !== this.wipValue) {
            this.wipValue = value;
            Info.gamesValue = undefined;
        }
    }
    static get games() {
        if (!Info.gamesValue) {
            Info.gamesValue = Object.freeze(table(games, this.wipValue));
        }
        return Info.gamesValue;
    }
    static game(id) {
        return Info.games.find((g) => g.id === id);
    }
    static similar(id, exclude) {
        return Info.games.filter((g) => g.originalId === id && g.id !== exclude);
    }
}
Info.wipValue = false;
//# sourceMappingURL=Info.js.map