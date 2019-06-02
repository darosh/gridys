import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VuetifyIcon from '@gridy/app-vuetify-icon'
import * as icons from '@gridy/app-icons'

// console.log(icon)

Vue.use(Vuetify, {
  theme: {
    primary: '#03a9f4'
  },
  icons: VuetifyIcon(icons)
})
