import { bounds } from './bounds';
import { SQRT_2 } from './Constants';
import { Float2 } from './Float2';
import { Position } from './Position';
import { RectangularTile } from './RectangularTile';
import { Shape } from './Shape';
import { TileType } from './TileType';
// TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
/**
 * ![](../../examples/output/rectangular-grid.svg)
 */
export class RectangularGrid {
    constructor(scale, orientation = false, shape = Shape.Even, x = 1, y = 1, tile = RectangularTile, startY = 0) {
        this.scaleY = -1;
        this.angle = -45;
        this.tileTypes = TileType.Simple;
        this.scale = scale;
        this.radius = scale / 2;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.startY = y;
        this.tileCtor = tile;
        const results = [];
        for (let px = 0; px < x; px++) {
            for (let py = startY; py < y; py++) {
                results.push(new tile(px, py));
            }
        }
        this.tiles = results;
        this.toTile = (p) => new this.tileCtor(p.x, p.y);
        this.toPoint = (p) => new Position(p.x, p.y);
    }
    bounds() {
        return bounds(this);
    }
    center(tile) {
        if (this.orientation) {
            return new Float2(tile.x * this.scale / SQRT_2 + tile.y * this.scale * this.scaleY / SQRT_2, tile.y * this.scale * this.scaleY / SQRT_2 - tile.x * this.scale / SQRT_2);
        }
        else {
            return new Float2(tile.x * this.scale, tile.y * this.scale * this.scaleY);
        }
    }
    vertices(orientation, scale) {
        const points = [];
        let s = (scale === undefined) ? this.scale : scale;
        const o = (orientation === undefined) ? false : this.orientation;
        if (o) {
            s *= SQRT_2;
            points.push(new Float2(-s / 2, 0));
            points.push(new Float2(0, -s / 2));
            points.push(new Float2(s / 2, 0));
            points.push(new Float2(0, s / 2));
        }
        else {
            points.push(new Float2(-s / 2, -s / 2));
            points.push(new Float2(-s / 2, s / 2));
            points.push(new Float2(s / 2, s / 2));
            points.push(new Float2(s / 2, -s / 2));
        }
        return points;
    }
    position(p) {
        return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY));
    }
    tile(x, y) {
        return this.toTile(new Position(x, y));
    }
}
//# sourceMappingURL=RectangularGrid.js.map