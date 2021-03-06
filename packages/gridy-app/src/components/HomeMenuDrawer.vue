<template>
  <div>
    <div class="mb-3">
      <v-toolbar
        dense
        flat
        color="transparent">
        <v-subheader class="pl-3">Options</v-subheader>
      </v-toolbar>
      <div class="mx-3">
        <v-layout
          row
          mx-3
          align-center
          class="touch-bottom">
          <v-flex class="body-1">Dark</v-flex>
          <div>
            <v-switch
              v-model="useDark"
              hide-details
              color="light-blue" />
          </div>
        </v-layout>
      </div>
      <div class="mx-3">
        <v-layout
          row
          mx-3
          align-center>
          <v-flex class="body-1">Full screen</v-flex>
          <div>
            <v-switch
              v-model="useFullscreen"
              hide-details
              color="light-blue" />
          </div>
        </v-layout>
      </div>
    </div>

    <v-divider/>
    <v-toolbar
      dense
      flat
      color="transparent">
      <v-subheader class="pl-3">Contact</v-subheader>
    </v-toolbar>

    <div class="mx-3 mb-3">
      <v-layout
        v-for="m in contacts"
        :key="m.title"
        row
        mx-3
        align-center
        mb-1>
        <v-flex class="body-2">{{ m.title }}</v-flex>
        <div
          v-if="m.link"
          class="body-1">
          <a
            :href="m.link"
            target="_blank"
            rel="noopener"
            class="light-blue--text">{{ m.value }}</a>
        </div>
        <div
          v-else
          class="body-1">{{ m.value }}</div>
      </v-layout>
    </div>

    <v-divider/>
    <v-toolbar
      dense
      flat
      color="transparent">
      <v-subheader class="pl-3">Application</v-subheader>
    </v-toolbar>

    <div class="mx-3 mb-3">
      <v-layout
        v-for="m in meta"
        :key="m.title"
        row
        mx-3
        align-center
        mb-1>
        <v-flex class="body-2">{{ m.title }}</v-flex>
        <div
          v-if="m.link"
          class="body-1">
          <a
            :href="m.link"
            target="_blank"
            rel="noopener"
            class="light-blue--text">{{ m.value }}</a>
        </div>
        <div
          v-else
          class="body-1">{{ m.value }}</div>
      </v-layout>
      <div
        v-if="$store.state.registration"
        class="px-3 mb-3 mt-3">
        <v-btn
          flat
          color="light-blue"
          small
          block
          @click="checkForUpdate()">Check for update</v-btn>
      </div>
    </div>

    <v-divider/>

    <v-expansion-panel>
      <v-expansion-panel-content>
        <div
          slot="header"
          style="margin-left: -8px">
          <v-subheader
            class="pa-0 ma-0"
            style="height: auto">Acknowledgement</v-subheader>
        </div>
        <v-layout
          v-for="d in dependencies"
          :key="d.text"
          row
          mx-3
          align-center
          mb-1
          px-3>
          <div class="body-1 pr-3">
            <a
              :href="d.link"
              target="_blank"
              rel="noopener"
              class="light-blue--text">{{ d.text }}</a>
          </div>
          <v-divider/>
          <div
            v-if="d.version"
            class="pl-3">{{ d.version }}</div>
        </v-layout>
        <div class="pb-3"/>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import { Info } from '../plugins/lib'
import { full } from '../services/full'

export default {
  components: {
    VSwitch: () => import('vuetify/es5/components/VSwitch'),
    VSubheader: () => import('vuetify/es5/components/VSubheader'),
    VDivider: () => import('vuetify/es5/components/VDivider'),
    VExpansionPanel: () =>
      import('vuetify/es5/components/VExpansionPanel/VExpansionPanel'),
    VExpansionPanelContent: () =>
      import('vuetify/es5/components/VExpansionPanel/VExpansionPanelContent')
  },
  data () {
    const deps = JSON.parse(process.env.VUE_APP_DEPENDENCIES)

    return {
      contacts: [
        {
          title: 'Twitter',
          value: '@GridyGames',
          link: 'https://twitter.com/GridyGames'
        }
      ],
      meta: [
        { title: 'Version', value: process.env.VUE_APP_VERSION },
        {
          title: 'Build',
          value: new Date(process.env.VUE_APP_BUILD).toLocaleString('en')
        },
        { title: 'Games', value: Info.games.length },
        {
          title: 'Source',
          value: 'github.com',
          link: 'https://github.com/darosh/gridy-games'
        }
      ],
      dependencies: Object.keys(deps)
        .map(k => {
          const v = deps[k]

          return {
            link: v.startsWith('github')
              ? `https://github.com/${v
                .replace('github:', '')
                .replace(/:.*/, '')}`
              : `https://www.npmjs.com/package/${k}`,
            text: k.replace(/@.*\//, ''),
            version: v.replace(/\^/, '').replace(/github:.*:/, '')
          }
        })
        .sort((a, b) => a.text.localeCompare(b.text))
    }
  },
  computed: {
    useDark: {
      get () {
        return this.$store.state.dark
      },
      set (value) {
        this.$store.commit('dark', value)
      }
    },
    useFullscreen: {
      get () {
        return this.$store.state.full
      },
      set (value) {
        this.$store.commit('full', value)
        full(value)
      }
    }
  },
  methods: {
    checkForUpdate () {
      window.$registration.update()
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1263px) {
  .touch-bottom {
    margin-bottom: 14px;
  }
}
</style>
