---
pageClass: demo-page
footer: MIT Licensed | Copyright © 2018-present Jan Forst
---

<Sandbox />

<v-layout class="mt-3">
<v-flex><a href="./grids/"><div class="title my-3">Grids</div><Diagram class="diagram" :width="240" :height="240" v-bind="grids.features[0].script(Gridy)" /></a></v-flex>
<v-flex><a href="./selections/"><div class="title my-3">Selection</div><Diagram class="diagram" :width="240" :height="240" v-bind="selection.features[0].script(Gridy)" /></a></v-flex>
<v-flex><a href="./paths/"><div class="title my-3">Paths</div><Diagram class="diagram" :width="240" :height="240" v-bind="paths.features[0].script(Gridy)" /></a></v-flex>
<v-flex><a href="./search/"><div class="title my-3">Search</div><Diagram class="diagram" :width="240" :height="240" v-bind="search.features[0].script(Gridy)" /></a></v-flex>
</v-layout>

<script>
import * as Gridy from '@gridy/core/dist/es6'
import { VLayout, VFlex } from 'vuetify/lib/components/VGrid'
import grids from './src/grids'
import paths from './src/paths'
import search from './src/search'
import selection from './src/selection'

export default {
  components: {
    VLayout,
    VFlex  
  },
  data: () => ({
    Gridy,
    grids, 
    selection,
    paths,
    search
  })
}
</script>
