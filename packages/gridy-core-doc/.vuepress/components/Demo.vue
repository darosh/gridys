<template>
  <div>
    <h3 v-text="group.group" class="my-4"/>
    <div class="demos">
      <div v-for="(feature, key) in group.features">
        <div class="demo"
           :style="{
             width: feature.width ? `${feature.width + 2}px !important` : null,
             minWidth: feature.width ? `${feature.width + 2}px !important` : null
           }">
          <h4>
          <span v-for="t in feature.title">
            {{t[0]}}<sup v-text="t[1]"/>
          </span>
          </h4>
          <Diagram v-bind="feature.script(Gridy)" style="margin: 0 auto;"/>
          <div style="text-align: right;">
            <a @click="codes[key] = !codes[key]">Code</a>
          </div>
          <div v-show="codes[key]" style="white-space: pre-wrap">
            {{feature.script.toString()}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Gridy from '@gridy/core/dist/es6'

export default {
  props: {
    group: {
      type: Object,
      required: true
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
