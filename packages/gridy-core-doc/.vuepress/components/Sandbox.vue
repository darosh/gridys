<template>
  <v-app id="vuetify">
    <v-layout row>
      <Diagram
        :width="480"
        :height="480"
        class="diagram mr-4"
        :grid="gridInstance"
        :show-axes="showAxes"
        :show-tiles="showTiles"
        :show-polygons="showPolygons"
        :show-centers="showCenters"
        :show-circles="showCircles"
        :show-coordinates="showCoordinates" />
      <v-flex>
        <v-radio-group hide-details v-model="grid">
          <v-layout>
            <v-radio class="my-0" hide-details v-for="g in grids" :label="g" :value="g"/>
          </v-layout>
        </v-radio-group>
        <v-radio-group hide-details v-model="shape" v-show="shapes.length !== 0">
          <v-layout>
            <v-radio class="my-0" hide-details v-for="g in shapes" :label="g" :value="g"/>
          </v-layout>
        </v-radio-group>
        <v-layout row wrap>
          <v-flex xs5>
            <v-slider
              class="mr-5"
              hide-details
              v-model="size"
              label="Size"
              color="accent"
              :min="5"
              :max="100"
              :step="1"/>
            <v-slider
              class="mr-5"
              hide-details
              v-model="x"
              label="X"
              color="accent"
              :min="1"
              :max="20"
              :step="1"/>
            <v-slider
              class="mr-5"
              hide-details
              v-model="y"
              label="Y"
              color="accent"
              :min="1"
              :max="20"
              :step="1"/>
          </v-flex>
          <v-flex xs2>
            <v-checkbox hide-details label="Orientation" v-model="orientation"/>
          </v-flex>
        </v-layout>
        <v-layout flex wrap>
          <v-checkbox hide-details label="Polygons" v-model="showPolygons"/>
          <v-checkbox hide-details label="Centers" v-model="showCenters"/>
          <v-checkbox hide-details label="Circles" v-model="showCircles"/>
          <v-checkbox hide-details label="Coordinates" v-model="showCoordinates"/>
          <v-checkbox hide-details label="Tiles" v-model="showTiles"/>
          <v-checkbox hide-details label="Axes" v-model="showAxes"/>
          <v-checkbox hide-details label="Path" v-model="showPath"/>
          <v-checkbox hide-details label="Search" v-model="showSearch"/>
        </v-layout>
        <div class="my-4 grey--text font-italic">
          Tiles: {{gridInstance.tiles.length}},
          X: {{x}},
          Y: {{y}},
          Size: {{size}}
        </div>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import * as Gridy from '@gridy/core/dist/es6'
import Diagram from './Diagram'

import { VRadioGroup, VRadio } from 'vuetify/lib/components/VRadioGroup'
import { VLayout, VFlex } from 'vuetify/lib/components/VGrid'
import { VSlider } from 'vuetify/lib/components/VSlider'

const grids = [
  'HexagonalGrid',
  'BrickGrid',
  'RectangularGrid',
  'TriangularGrid',
  'RadialGrid'
]

const shapes = Object.keys(Gridy.enumerate(Gridy.Shape))

export default {
  components: {
    Diagram,
    VApp: () => import('vuetify/lib/components/VApp'),
    VCheckbox: () => import('vuetify/lib/components/VCheckbox'),
    VRadioGroup,
    VRadio,
    VFlex,
    VSlider,
    VLayout
  },
  data: () => ({
    grid: grids[0],
    grids,
    size: 50,
    x: 5,
    y: 5,
    shapes,
    shape: shapes[0],
    orientation: false,
    showPolygons: true,
    showCenters: false,
    showCircles: false,
    showCoordinates: false,
    showTiles: false,
    showAxes: false,
    showPath: false,
    showSearch: false
  }),
  watch: {
    grid: {
      immediate: true,
      handler (grid) {
        this.shapes = (Gridy[grid].shapes || []).map(i => Gridy.Shape[i])
        this.shape = this.shapes[0]
      }
    }
  },
  computed: {
    gridInstance () {
      const {size, orientation, shape, x, y} = this

      return new Gridy[this.grid](size, orientation, Gridy.Shape[shape], x, y)
    }
  }
}
</script>
<style lang="stylus">
.application.theme--light {
  background-color: transparent;

  .application--wrap {
    min-height: 0;
  }
}
.diagram {
  border: 1px solid rgba(0, 0, 0, .12);
  background-color: rgba(0, 0, 0, .01);
  border-radius: 12px;
}
</style>
