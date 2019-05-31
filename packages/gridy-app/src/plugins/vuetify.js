import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VuetifyIcon from '@gridy/vuetify-icon'
import * as icons from '@gridy/games-icons'

// console.log(icon)

Vue.use(Vuetify, {
  theme: {
    primary: '#03a9f4'
  },
  icons: VuetifyIcon(icons)
})
