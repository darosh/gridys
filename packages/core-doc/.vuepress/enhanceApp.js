import Vuetify from 'vuetify/lib'

import 'vuetify/dist/vuetify.min.css'

export default ({
                  Vue, // the version of Vue being used in the VuePress app
                  options, // the options for the root Vue instance
                  router, // the router instance for the app
                  siteData // site metadata
                }) => {
  Vue.use(Vuetify, { theme: { accent: '#3eaf7c', primary: '#3eaf7c' } })
}
