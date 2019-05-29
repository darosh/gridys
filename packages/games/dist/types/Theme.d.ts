export declare enum Theme {
    Checkers = 0,
    CheckersHex = 1,
    Gomoku = 2,
    Hex = 3,
    Mills = 4,
    Plastic = 5,
    Qirkat = 6,
    Reversi = 7,
    TacTickle = 8
}
export declare enum Stones {
    BlackWhite = 0,
    OrangeBlue = 1,
    RedYellow = 2
}
export declare const ThemeStones: {
    [Theme.Checkers]: Stones;
    [Theme.CheckersHex]: Stones;
    [Theme.Gomoku]: Stones;
    [Theme.Hex]: Stones;
    [Theme.Mills]: Stones;
    [Theme.Plastic]: Stones;
    [Theme.Qirkat]: Stones;
    [Theme.Reversi]: Stones;
    [Theme.TacTickle]: Stones;
};
export declare const StoneNames: {
    [Stones.BlackWhite]: string[];
    [Stones.OrangeBlue]: string[];
    [Stones.RedYellow]: string[];
};
