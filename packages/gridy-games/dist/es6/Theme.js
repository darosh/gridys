export var Theme;
(function (Theme) {
    Theme[Theme["Checkers"] = 0] = "Checkers";
    Theme[Theme["CheckersHex"] = 1] = "CheckersHex";
    Theme[Theme["Gomoku"] = 2] = "Gomoku";
    Theme[Theme["Hex"] = 3] = "Hex";
    Theme[Theme["Mills"] = 4] = "Mills";
    Theme[Theme["Plastic"] = 5] = "Plastic";
    Theme[Theme["Qirkat"] = 6] = "Qirkat";
    Theme[Theme["Reversi"] = 7] = "Reversi";
    Theme[Theme["TacTickle"] = 8] = "TacTickle";
})(Theme || (Theme = {}));
export var Stones;
(function (Stones) {
    Stones[Stones["BlackWhite"] = 0] = "BlackWhite";
    Stones[Stones["OrangeBlue"] = 1] = "OrangeBlue";
    Stones[Stones["RedYellow"] = 2] = "RedYellow";
})(Stones || (Stones = {}));
// tslint:disable-next-line:variable-name
export const ThemeStones = {
    [Theme.Checkers]: Stones.BlackWhite,
    [Theme.CheckersHex]: Stones.BlackWhite,
    [Theme.Gomoku]: Stones.BlackWhite,
    [Theme.Hex]: Stones.OrangeBlue,
    [Theme.Mills]: Stones.BlackWhite,
    [Theme.Plastic]: Stones.RedYellow,
    [Theme.Qirkat]: Stones.BlackWhite,
    [Theme.Reversi]: Stones.BlackWhite,
    [Theme.TacTickle]: Stones.OrangeBlue
};
// tslint:disable-next-line:variable-name
export const StoneNames = {
    [Stones.BlackWhite]: ['Black', 'White'],
    [Stones.OrangeBlue]: ['Orange', 'Blue'],
    [Stones.RedYellow]: ['Red', 'Yellow']
};
//# sourceMappingURL=Theme.js.map