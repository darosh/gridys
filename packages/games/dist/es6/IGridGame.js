/**
 * AnyTile single placement
 * [AnyTile, AnyTile] simple move
 * [AnyTile, AnyTile, AnyTile] double move
 * [AnyTile, [AnyTile, [removed]] move + removed
 * [[AnyTile, undefined, modified] move + modified
 */
export var Phase;
(function (Phase) {
    Phase[Phase["PLACE"] = 0] = "PLACE";
    Phase[Phase["REMOVED"] = 1] = "REMOVED";
    Phase[Phase["MODIFIED"] = 2] = "MODIFIED";
})(Phase || (Phase = {}));
//# sourceMappingURL=IGridGame.js.map