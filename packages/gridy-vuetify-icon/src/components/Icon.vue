<!-- eslint-disable vue/no-v-html -->

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    @click="$emit('click', $event)">
    <g
      v-if="path[0] === '<'"
      v-html="path" />
    <path
      v-else
      :d="path" />
  </svg>
</template>
<script>
const DEFAULT_SIZE = 24

export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      size: this.$parent.size || DEFAULT_SIZE
    }
  },
  watch: {
    '$parent.size' (size) {
      this.size = (size != null) ? size : DEFAULT_SIZE
    }
  }
}
</script>
<style scoped>
svg {
  fill: currentColor;
}
</style>
