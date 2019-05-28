<template>
  <svg :width="width" :height="height" class="block">
    <g :transform="`translate(${translate})`">
      <g class="tile"
         v-for="(node, key) in nodes"
         :key="key"
         :transform="node.translate"
         :title="node.key"
         :class="{[highlightDark ? 'highlight-dark' : 'highlight']: highlightedKeys.includes(node.key)}">
        <polygon v-if="showPolygons" :points="node.points" :style="{fill: node.fill}" :transform="rotate"/>
        <g class="center" v-if="showCenters">
          <circle r="5"/>
        </g>
        <g class="circle" v-if="showCircles">
          <circle :r="grid.radius"/>
        </g>
        <g class="axes" v-if="showAxes">
          <text y="0.4em">
            <tspan class="q" v-text="node.a" />
            <tspan class="s" v-text="node.b" />
          </text>
        </g>
        <g class="coordinates" v-if="showCoordinates">
          <text y="0.4em">
            <tspan class="x" v-text="node.position.x"/>
            ,
            <tspan class="y" v-text="node.position.y"/>
          </text>
        </g>
        <g class="tiles" v-if="showTiles && (labels.length !== 0)">
          <text y="0.4em">
            <tspan v-if="!!labels[0]" class="q" v-text="node.axes[0]" :x="labels[0].x" :y="labels[0].y"/>
            <tspan v-if="!!labels[1]" class="s" v-text="node.axes[1]" :x="labels[1].x" :y="labels[1].y"/>
            <tspan v-if="!!labels[2]" class="r" v-text="node.axes[2]" :x="labels[2].x" :y="labels[2].y"/>
          </text>
        </g>
        <g class="values"></g>
      </g>
      <g class="lines">
        <path class="path" :d="d" v-for="d in linesData"></path>
      </g>
      <g>
        <path class="path" :d="pathData"/>
      </g>
    </g>
  </svg>
</template>
<script>
import { Shape, HexagonalGrid, Float2, circle, HexagonalTile, Search, RadialGrid } from '@gridy/core/dist/es6'
import { interpolate } from 'd3-interpolate'

export default {
  props: {
    width: {
      type: Number,
      default: 340
    },
    height: {
      type: Number,
      default: 340
    },
    grid: {
      type: Object,
      required: true
    },
    highlight: {
      type: Array,
      default: () => [],
    },
    path: {
      type: Array,
      default: () => []
    },
    lines: {
      type: Array,
      default: () => []
    },
    search: {
      type: Object,
      default: null
    },
    animations: {
      type: Boolean,
      default: true
    },
    highlightDark: {
      type: Boolean,
      default: false
    },
    showAxes: {
      type: Boolean,
      default: false
    },
    showCenters: {
      type: Boolean,
      default: false
    },
    showCircles: {
      type: Boolean,
      default: false
    },
    showCoordinates: {
      type: Boolean,
      default: false
    },
    showPolygons: {
      type: Boolean,
      default: true
    },
    showTiles: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number,
      default: 12
    }
  },
  computed: {
    bounds () {
      return this.grid.bounds()
    },
    translate () {
      const { width, height, bounds } = this

      return new Float2(
        (width - bounds.minX - bounds.maxX) / 2,
        (height - bounds.minY - bounds.maxY) / 2
      )
    },
    nodes () {
      const { search } = this
      const { irregular } = this.grid

      const paths = []

      if (!irregular) {
        for (let i = 0; i < (this.grid.tileTypes || 0); i++) {
          paths.push(this.shapePath(i))
        }
      }

      const fromTile = 'hsl(90, 80%, 80%)'
      const to = 'hsl(200, 80%, 80%)'
      const color = interpolate(fromTile, to)

      return this.grid.tiles.map((tile) => {
        const axes = this.axes(tile)
        const center = this.grid.center(tile)
        const position = this.grid.toPoint(tile)
        const key = tile.toString()

        const points = this.grid.tileTypes === 1
          ? (irregular ? this.grid.vertices(false, 0, 0, tile).map(p => `${p.x.toFixed(3)},${p.y.toFixed(3)}`).join(' ')
            : paths[0])
          : (this.grid.getTileType
            ? paths[this.grid.getTileType(tile)]
            : '')

        const v = search ? search.cost[key] : -1
        const fill = (v >= 0) ? color(v / (search.max || 1)) : null

        const point = this.grid.toPoint(tile)

        const b = point.y + 1
        const a = point.x.toString(25)
          .replace(/./g, (t) => t === '-'
            ? '-'
            : String.fromCharCode(t.charCodeAt(0) + (t.charCodeAt(0) >= 97 ? 10 : 49)))

        return {
          tile,
          key,
          tileKey: point.toString(),
          a,
          b,
          center,
          position,
          axes,
          fill,
          points,
          translate: `translate(${center.x},${center.y})`
        }
      })
    },
    pathData () {
      const d = []

      for (let i = 0; i < this.path.length; i++) {
        d.push(i === 0 ? 'M' : 'L')
        d.push(this.grid.center(this.path[i]).toString())
      }

      return d.join(' ')
    },
    highlightedKeys () {
      return this.highlight.map(m => m.toString())
    },
    labels () {
      const r = []

      try {
        if (this.grid.tileTypes === 1) {
          const o = this.grid.vertices(this.grid.orientation, this.grid.scale - this.fontSize * 1.5)

          r[0] = { x: o[0].x, y: o[0].y + this.fontSize * 0.4 }
          r[1] = { x: o[2].x, y: o[2].y + this.fontSize * 0.4 }

          if (o.length > 4) {
            r[2] = { x: o[4].x, y: o[4].y + this.fontSize * 0.4 }
          } else if (o.length >= 3) {
            r[2] = { x: o[1].x, y: o[1].y + this.fontSize * 0.4 }
          }
        }
      } catch (e) { }

      return r
    },
    rotate () {
      return `rotate(${this.grid.orientation * this.grid.angle})`
    },
    linesData () {
      const tiles = this.lines

      if (!tiles || !tiles.length) {
        return []
      }

      return tiles.map(t => {
        const d = []

        for (let i = 0; i < t.length; i++) {
          d.push(i === 0 ? 'M' : 'L')
          d.push(this.grid.center(t[i]).toString())
        }

        return d.join(' ')
      })
    }
  },
  methods: {
    shapePath (tileType) {
      return this.grid.vertices(undefined, undefined, tileType).map(p =>
        `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
        .join(' ')
    },
    axes (tile) {
      let labels = [...tile.value]

      if (labels[0] === 0 && labels[1] === 0 && labels[2] === 0) {
        labels = ['x', 'y', 'z']
      }

      if (labels[2] === true) {
        labels[2] = 'T'
      } else if (labels[2] === false) {
        labels[2] = 'F'
      }

      return labels
    }
  }
}
</script>
<style scoped>
text {
  font-size: 14px;
  text-anchor: middle;
  font-family: Arial, Helvetica, sans-serif;
}

.tile polygon {
  fill: hsl(60, 10%, 95%);
  stroke: hsl(0, 0%, 70%);
  stroke-width: 0.5;
}

.tile .paths path {
  fill: rgba(255, 0, 0, 0.2);
  stroke: rgba(255, 0, 255, 0.2);
  stroke-width: 0.5;
}

.path {
  fill: none;
  stroke: hsl(60, 20%, 15%);
  stroke-width: 12px;
  stroke-opacity: 0.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.q {
  fill: hsl(90, 100%, 35%);
}

.r {
  fill: hsl(200, 100%, 45%);
}

.s {
  fill: hsl(300, 80%, 50%);
}

.highlight polygon {
  fill: hsl(200, 50%, 80%);
}

.highlight-dark polygon {
  fill: hsl(200, 10%, 35%);
}

.marker {
  fill: #308dde;
}

.center {
  fill: hsl(160, 85%, 75%);
}

.circle {
  fill: hsla(240, 5%, 75%, 0.12);
  stroke: hsl(0, 0%, 70%);
  stroke-width: 0.5;
  stroke-opacity: 0.95;
}

.block {
  display: block;
}
</style>
