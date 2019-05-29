import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@gridy/vuetify-svg-icon/dist/VuetifySvgIcon.umd'
import '@gridy/vuetify-svg-icon/dist/VuetifySvgIcon.css'
import * as icons from '@gridy/games-icons'

Vue.use(Vuetify, {
  theme: {
    primary: '#03a9f4'
  },
  icons: VuetifySvgIcon.default(icons)
})

