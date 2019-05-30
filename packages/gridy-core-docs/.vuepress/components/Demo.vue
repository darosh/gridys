<template>
  <v-app>
    <h3 v-text="group.group" class="my-4"/>
    <div class="demos">
      <div v-for="(feature, key) in group.features">
        <div class="demo"
           :style="{
             width: feature.width ? `${feature.width + 2}px !important` : null,
             minWidth: feature.width ? `${feature.width + 2}px !important` : null
           }">
          <h4>
            <span v-for="t, key in feature.title" :key="key"><span v-if="key">, </span>{{t[0]}} <small class="grey--text text--darken-3 font-weight-regular" style="font-size: 14px;" v-text="t[1]"/></span>
          </h4>
          <Diagram v-bind="feature.script(Gridy)" style="margin: 0 auto;"/>
          <div style="text-align: right;">
            <v-btn flat icon @click="codes[key] = !codes[key]" color="primary"><v-icon>code</v-icon></v-btn>
          </div>
          <div v-show="codes[key]" style="white-space: pre-wrap; font-family: Consolas, Menlo, Monaco, monospace;" v-text="code ? code[key] : feature.script.toString()" class="pa-3"/>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import * as Gridy from '@gridy/core/dist/es6'
import { VIcon } from 'vuetify/lib/components/VIcon'
import { VBtn } from 'vuetify/lib/components/VBtn'
import { VApp } from 'vuetify/lib/components/VApp'

export default {
  components: {
    VApp,
    VIcon,
    VBtn
  },
  props: {
    group: {
      type: Object,
      required: true
    },
    code: {
      type: Array,
      default: null
    }
  },
  data () {
    const codes = this.group.features.reduce((acc, a, i) => {
      acc[i] = false
      return acc
    }, {})

    return {
      Gridy,
      codes
    }
  }
}
</script>
<style scoped lang="stylus">
h4 {
  padding: 8px 16px;
  margin: 0;
}

a {
  margin: 8px 16px;
  cursor: pointer;
  display: inline-block;
}

.demos {
  display: flex;
  flex-wrap: wrap;
  margin: -16px;

  & > div {
    flex: 1;
  }
}

.demo {
  margin: 16px;
  border: 1px solid rgba(0, 0, 0, .12);
  background-color: rgba(0, 0, 0, .01);
  border-radius: 12px;
}
</style>
<style lang="stylus">
.application.theme--light {
  background-color: transparent;

  .application--wrap {
    min-height: 0;
  }
}
</style>
