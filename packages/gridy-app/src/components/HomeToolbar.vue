<template>
  <v-toolbar
    v-show="this.$route.name"
    :color="$store.state.dark ? 'grey darken-3' : 'grey lighten-3'"
    :dense="!Shared.searching"
    :extended="Shared.searching"
    :height="Shared.searching ? 82 : null"
    class="elevation-1"
    tabs
    scroll-off-screen
    app>
    <v-btn
      v-if="!Shared.searching"
      aria-label="Menu"
      icon
      @click.stop="Shared.menu=!Shared.menu">
      <v-icon>$vuetify.icons.menu</v-icon>
    </v-btn>
    <v-toolbar-title
      v-if="!Shared.searching"
      class="hidden-xs-only">Gridy Games</v-toolbar-title>
    <v-spacer v-if="!Shared.searching" />
    <v-text-field
      v-if="Shared.searching"
      v-model="Shared.search"
      :class="this.$store.state.dark ? 'grey darken-1' : 'white'"
      :append-icon-cb="() => {Shared.searching = !Shared.searching}"
      :loading="Shared.loading"
      label="Search"
      class="mx-3"
      prepend-icon="search"
      append-icon="close"
      browser-autocomplete="off"
      spellcheck="false"
      autocomplete
      solo
      hide-details
      single-line />
    <v-btn
      v-if="!Shared.searching"
      aria-label="Search"
      icon
      @click.stop="Shared.searching = !Shared.searching">
      <v-icon>$vuetify.icons.search</v-icon>
    </v-btn>
    <v-spacer
      v-if="Shared.searching"
      slot="extension" />
    <div
      :slot="Shared.searching ? 'extension' : null"
      style="margin-right: 0 !important">
      <v-btn
        :to="{path: $route.name === 'table' ? '/' : '/table'}"
        icon><v-icon>$vuetify.icons.{{ $route.name === 'table' ? 'view_cards' : 'view_table' }}</v-icon></v-btn>
      <v-btn
        v-if="useFirebase"
        :color="isReady() ? 'light-blue--text' : ''"
        :to="{path: '/online'}"
        icon><v-icon>$vuetify.icons.earth</v-icon></v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import Vue from 'vue'
import { Shared } from '../services/shared'
import { search } from '../worker/search'
import { isReady } from '../services/online/states'

export default {
  components: {
    VTextField: () => import('vuetify/es5/components/VTextField')
  },
  data () {
    return {
      Shared,
      input: null,
      useFirebase: !!process.env.VUE_APP_FIREBASE
    }
  },
  watch: {
    'Shared.search': function () {
      this.updateSearch(Shared.search)
    },
    'Shared.searching': function () {
      Vue.nextTick(() => {
        this.updateSearch(Shared.searching ? Shared.search : '')
      })
    }
  },
  methods: {
    isReady,
    updateSearch (value, oldValue) {
      Shared.loading = true
      search(value).then(({ items }) => {
        Shared.items = items
        Shared.loading = false
      })
    }
  }
}
</script>
