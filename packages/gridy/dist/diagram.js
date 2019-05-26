(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Diagram = factory());
}(this, (function () { 'use strict';

    class Integer2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        get value() {
            return [this.x, this.y];
        }
        distance(b) {
            return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
        }
        toString() {
            return this.value.toString();
        }
        equals(p) {
            return (this.x === p.x) && (this.y === p.y);
        }
        add(p) {
            return new Integer2(this.x + p.x, this.y + p.y);
        }
        scale(d) {
            return new Integer2(this.x * d, this.y * d);
        }
        cubeLength() {
            return Math.floor((Math.abs(this.x) + Math.abs(this.y)) / 2);
        }
    }
    //# sourceMappingURL=Integer2.js.map

    class Float2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        static ROUND(h) {
            const rx = Math.round(h.x);
            const ry = Math.round(h.y);
            return new Integer2(rx, ry);
        }
        static LERP(a, b, t) {
            return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
        }
        static LINE(a, b) {
            const N = a.distance(b);
            const results = [];
            for (let i = 0; i < (N + 1); i++) {
                results.push(Float2.ROUND(Float2.LERP(a, b, 1 / Math.max(1, N) * i)));
            }
            return results;
        }
        equals(p) {
            return (this.x === p.x) && (this.y === p.y);
        }
        get value() {
            return [this.x, this.y];
        }
        scale(k) {
            return new Float2(this.x * k, this.y * k);
        }
        toString() {
            return this.value.toString();
        }
    }
    //# sourceMappingURL=Float2.js.map

    /**
     * @external
     */
    class Diagram {
        constructor(svg, grid, animation = true) {
            this.translate = new Float2();
            this.fontSize = 14;
            this.duration = 0;
            this.data = {};
            this.showPolygons = true;
            this.showPolygonPaths = true;
            this.showCenters = false;
            this.showCircles = false;
            this.showAxes = false;
            this.showCoordinates = false;
            this.showTiles = false;
            this.svg = svg;
            this.grid = grid;
            this.animation = animation;
            this.root = svg.append('g');
            this.paths = svg.append('g');
            this.init();
        }
        init() {
            if (this.nodes) {
                this.duration = 800;
            }
            this.initRoot();
            this.initTiles();
            if (this.showPolygons) {
                this.polygons(null);
            }
            if (this.showCenters) {
                this.centers(null);
            }
            if (this.showCircles) {
                this.circles(null);
            }
            if (this.showCoordinates) {
                this.coordinates(null);
            }
            if (this.showTiles) {
                this.tiles(null);
            }
            if (this.showAxes) {
                this.axes(null);
            }
            return this;
        }
        polygons(show = true) {
            let polygons;
            const irregular = this.grid.irregular;
            this.polygonPaths(show);
            if (show === false) {
                this.all.selectAll('g.polygon').selectAll('*').remove();
                this.showPolygons = false;
                return this;
            }
            else if (show === true && !this.showPolygons) {
                polygons = this.all.selectAll('g.polygon').append('polygon');
                this.showPolygons = true;
            }
            else if (show !== true) {
                this.tilesEnter.selectAll('g.polygon').append('polygon');
                polygons = this.all.selectAll('g.polygon').selectAll('*');
                this.showPolygons = true;
            }
            else {
                return this;
            }
            const paths = [];
            if (!irregular) {
                for (let i = 0; i < (this.grid.tileTypes || 0); i++) {
                    paths.push(this.shapePath(i));
                }
            }
            if (this.grid.tileTypes === 1) {
                polygons.attr('points', (node) => {
                    if (irregular) {
                        return this.grid.vertices(false, 0, 0, this.data[node].tile).map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
                            .join(' ');
                    }
                    else {
                        return paths[0];
                    }
                });
            }
            else {
                polygons.attr('points', (node) => {
                    return this.grid.getTileType ? paths[this.grid.getTileType(this.data[node].tile)] : '';
                });
            }
            this.transition(polygons)
                .attr('transform', `rotate(${this.grid.orientation * this.grid.angle})`);
            return this;
        }
        polygonPaths(show = true) {
            let polygons;
            if (show === false) {
                this.all.selectAll('g.paths').selectAll('*').remove();
                this.showPolygonPaths = false;
                return;
            }
            else if (show === true && !this.showPolygonPaths) {
                polygons = this.all.selectAll('g.paths').append('path');
                this.showPolygonPaths = true;
            }
            else if (show !== true) {
                this.tilesEnter.selectAll('g.paths').append('path');
                polygons = this.all.selectAll('g.paths').selectAll('path');
                this.showPolygonPaths = true;
            }
            else {
                return;
            }
            polygons.attr('d', (node) => {
                return this.grid.path ? (this.grid.path)(this.data[node].tile) : 'M 0 0';
            });
            this.transition(polygons)
                .attr('transform', `rotate(${this.grid.orientation * this.grid.angle})`);
        }
        /**
         * Show/hide tile center POINTS
         * @param show
         * @returns {Diagram}
         */
        centers(show = true) {
            if (show === false) {
                this.all.selectAll('g.center').selectAll('circle').remove();
                this.showCenters = false;
                return this;
            }
            else if (show === true && !this.showCenters) {
                this.all.selectAll('g.center').append('circle').attr('class', 'center').attr('r', 5);
                this.showCenters = true;
            }
            else if (show !== true) {
                this.tilesEnter.selectAll('g.center').append('circle').attr('class', 'center').attr('r', 5);
            }
            return this;
        }
        circles(show = true) {
            let circles;
            if (show === false) {
                this.all.selectAll('g.circle').selectAll('circle').remove();
                this.showCircles = false;
                return this;
            }
            else if (show === true && !this.showCircles) {
                circles = this.all.selectAll('g.circle').append('circle').attr('class', 'circle');
                this.showCircles = true;
            }
            else if (show !== true) {
                this.tilesEnter.selectAll('g.circle').append('circle').attr('class', 'circle');
                circles = this.all.selectAll('g.circle').selectAll('circle');
                this.showCircles = true;
            }
            else {
                return this;
            }
            this.transition(circles).attr('r', this.grid.radius);
            return this;
        }
        coordinates(show = true) {
            let tiles;
            if (show === false) {
                this.all.selectAll('g.coordinates').selectAll('text').remove();
                this.showCoordinates = false;
                return this;
            }
            else if (show === true && !this.showCoordinates) {
                tiles = this.all.selectAll('g.coordinates').append('text');
                this.showCoordinates = true;
            }
            else if (show !== true) {
                this.tilesEnter.selectAll('g.coordinates').append('text');
                tiles = this.all.selectAll('g.coordinates').selectAll('text');
                this.showCoordinates = true;
            }
            else {
                return this;
            }
            const that = this;
            tiles.attr('y', '0.4em')
                .each(function (node) {
                const p = that.grid.toPoint(that.data[node].tile);
                const selection = d3.select(this);
                selection.selectAll('*').remove();
                selection.append('tspan').attr('class', 'x').text(p.x);
                selection.append('tspan').text(', ');
                selection.append('tspan').attr('class', 'y').text(p.y);
            });
            return this;
        }
        axes(show = true) {
            let tiles;
            if (show === false) {
                this.all.selectAll('g.axes').selectAll('text').remove();
                this.showAxes = false;
                return this;
            }
            else if (show === true && !this.showAxes) {
                tiles = this.all.selectAll('g.axes').append('text');
                this.showAxes = true;
            }
            else if (show !== true) {
                this.tilesEnter.selectAll('g.axes').append('text');
                tiles = this.all.selectAll('g.axes').selectAll('text');
                this.showAxes = true;
            }
            else {
                return this;
            }
            const that = this;
            tiles.attr('y', '0.4em')
                .each(function (node) {
                const p = that.grid.toPoint(that.data[node].tile);
                const selection = d3.select(this);
                selection.selectAll('*').remove();
                selection.append('tspan').attr('class', 'q').text(p.x.toString(25)
                    .replace(/./g, (t) => t === '-'
                    ? '-'
                    : String.fromCharCode(t.charCodeAt(0) + (t.charCodeAt(0) >= 97 ? 10 : 49))));
                selection.append('tspan').attr('class', 's').text(p.y + 1);
            });
            return this;
        }
        values(data) {
            const that = this;
            this.all.selectAll('g.values').append('text')
                .attr('y', '0.4em')
                .text(function (node) {
                const p = that.grid.toPoint(that.data[node].tile);
                return data[that.data[node].tile.toString()];
            });
            return this;
        }
        tiles(show = true) {
            let tiles;
            if (show === false) {
                this.all.selectAll('g.tiles').selectAll('text').remove();
                this.showTiles = false;
                return this;
            }
            else if (show === true && !this.showTiles) {
                tiles = this.all.selectAll('g.tiles').append('text');
                this.showTiles = true;
            }
            else if (show !== true) {
                this.tilesEnter.selectAll('g.tiles').append('text');
                tiles = this.all.selectAll('g.tiles').selectAll('text');
                this.showTiles = true;
            }
            else {
                return this;
            }
            const that = this;
            tiles.attr('y', '0.4em')
                .each(function (node) {
                const selection = d3.select(this);
                let labels = that.data[node].tile.value;
                if (labels[0] === 0 && labels[1] === 0 && labels[2] === 0) {
                    labels = ['x', 'y', 'z'];
                }
                if (labels[2] === true) {
                    labels[2] = 'T';
                }
                else if (labels[2] === false) {
                    labels[2] = 'F';
                }
                selection.selectAll('*').remove();
                selection.append('tspan').attr('class', 'q').text(labels[0]);
                selection.append('tspan').attr('class', 's').text(labels[1]);
                selection.append('tspan').attr('class', 'r').text(labels[2]);
            });
            if (this.grid.tileTypes === 1) {
                const o = this.grid.vertices(this.grid.orientation, this.grid.scale - this.fontSize * 1.5);
                this.all.select('.tiles .q').attr('x', o[0].x).attr('y', o[0].y + this.fontSize * 0.4);
                this.all.select('.tiles .s').attr('x', o[2].x).attr('y', o[2].y + this.fontSize * 0.4);
                if (o.length > 4) {
                    this.all.select('.tiles .r').attr('x', o[4].x).attr('y', o[4].y + this.fontSize * 0.4);
                }
                else if (o.length >= 3) {
                    this.all.select('.tiles .r').attr('x', o[1].x).attr('y', o[1].y + this.fontSize * 0.4);
                }
            }
            return this;
        }
        /**
         * Highlight selected tiles
         * @param tiles Array of selected tiles
         * @param classed Optional highlight class
         * @returns {Diagram} For chain call
         */
        highlight(tiles, classed = 'highlight') {
            const tileSet = d3.set(tiles);
            this.all.classed(classed, (node) => {
                return tileSet.has(this.data[node].tile);
            });
            return this;
        }
        path(tiles, color, width = 5) {
            this.paths.selectAll('*').remove();
            if (!tiles || !tiles.length) {
                return this;
            }
            const path = this.paths.append('path')
                .attr('d', 'M 0 0')
                .attr('class', 'path')
                .attr('style', `stroke: ${color}; stroke-width: ${width}px;`);
            const d = [];
            for (let i = 0; i < tiles.length; i++) {
                d.push(i === 0 ? 'M' : 'L');
                d.push(this.grid.center(tiles[i]).toString());
            }
            path.attr('d', d.join(' '));
            return this;
        }
        lines(tiles, color, width = 5) {
            this.paths.selectAll('*').remove();
            if (!tiles || !tiles.length) {
                return this;
            }
            const path = this.paths.selectAll('path').data(tiles).enter().append('path')
                .attr('d', 'M 0 0')
                .attr('class', 'path')
                .attr('style', `stroke: ${color}; stroke-width: ${width}px;`);
            path.attr('d', (t) => {
                const d = [];
                for (let i = 0; i < t.length; i++) {
                    d.push(i === 0 ? 'M' : 'L');
                    d.push(this.grid.center(t[i]).toString());
                }
                return d.join(' ');
            });
            return this;
        }
        search(search, fromTile = 'hsl(90, 80%, 80%)', to = 'hsl(200, 80%, 80%)') {
            if (!search) {
                this.all.selectAll('g.polygon').selectAll('polygon').style('fill', null);
                return this;
            }
            const color = d3.interpolate(fromTile, to);
            this.all.selectAll('g.polygon').selectAll('polygon').style('fill', (node) => {
                const v = search.cost[this.data[node].key];
                return (v >= 0) ? color(v / (search.max || 1)) : null;
            });
            return this;
        }
        point(xy) {
            if (!this.pointElement) {
                this.pointElement = this.svg.append('circle');
                this.pointElement.attr('class', 'marker').attr('r', 5);
            }
            const tile = this.grid.position(new Float2(xy[0], xy[1]));
            this.pointElement.attr('transform', `translate(${xy[0] + this.translate.x},${xy[1] + this.translate.y})`);
            // console.log(xy, tile)
            this.all.classed('highlight', (node) => {
                return this.data[node].tile.equals(tile);
            });
            return this;
        }
        mousePoint() {
            this.svg.on('mousemove', () => {
                const xy = d3.mouse(this.root.node());
                this.point(xy);
            });
            return this;
        }
        initRoot() {
            const bounds = this.grid.bounds();
            this.translate = new Float2((parseFloat(this.svg.attr('width')) - bounds.minX - bounds.maxX) / 2, (parseFloat(this.svg.attr('height')) - bounds.minY - bounds.maxY) / 2);
            this.transition(this.root).attr('transform', `translate(${this.translate})`);
            this.transition(this.paths).attr('transform', `translate(${this.translate})`);
            // this.root.append("rect").attr("class", "bound")
            // .attr("x", bounds.minX).attr("y", bounds.minY)
            // .attr("width", bounds.maxX - bounds.minX).attr("height", bounds.maxY - bounds.minY);
        }
        initTiles() {
            this.nodes = this.grid.tiles.map((n) => {
                const d = { tile: n, key: n.toString(), tileKey: this.grid.toPoint(n).toString() };
                this.data[d.tileKey] = d;
                return d.tileKey;
            });
            this.tilesElements = this.root.selectAll('g.tile').data(this.nodes, (d) => d);
            this.transition(this.tilesElements.exit(), 0.5).style('opacity', 0).remove();
            const tilesEnter = this.tilesElements.enter().append('g')
                .attr('class', 'tile')
                .style('opacity', this.animation ? 0 : 1)
                .attr('transform', (node) => {
                const center = this.grid.center(this.data[node].tile);
                return `translate(${center.x},${center.y})`;
            });
            tilesEnter.append('g').attr('class', 'polygon');
            tilesEnter.append('g').attr('class', 'paths');
            tilesEnter.append('g').attr('class', 'center');
            tilesEnter.append('g').attr('class', 'circle');
            tilesEnter.append('g').attr('class', 'axes');
            tilesEnter.append('g').attr('class', 'coordinates');
            tilesEnter.append('g').attr('class', 'tiles');
            tilesEnter.append('g').attr('class', 'values');
            this.transition(this.tilesElements.merge(tilesEnter)).attr('transform', (node) => {
                const center = this.grid.center(this.data[node].tile);
                return `translate(${center.x},${center.y})`;
            }).style('opacity', 1);
            this.tilesEnter = tilesEnter;
            this.all = this.tilesEnter.merge(this.tilesElements);
        }
        shapePath(tileType) {
            return this.grid.vertices(undefined, undefined, tileType).map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
                .join(' ');
        }
        transition(selection, delta = 1) {
            return ((this.animation && (this.duration * delta))
                ? selection.transition().duration(this.duration * delta)
                : selection);
        }
    }
    //# sourceMappingURL=Diagram.js.map

    return Diagram;

})));
//# sourceMappingURL=diagram.js.map
