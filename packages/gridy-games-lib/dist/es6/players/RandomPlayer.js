export class RandomPlayer {
    select(game) {
        const possible = game.possible();
        return { move: possible[Math.floor(Math.random() * possible.length)] };
    }
}
//# sourceMappingURL=RandomPlayer.js.map