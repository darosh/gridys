import Vue from 'vue'

// import './plugins/helpers'
// import './plugins/debug'
import './plugins/visibility'
import './plugins/vuetify'
import './registerServiceWorker'

import { analytics } from './plugins/analytics'

import router from './router'
import store from './store'

import App from './components/App'

import './style/index.styl'

import { era, link, titled, number } from './filters'

Vue.config.productionTip = false

if (process.env.VUE_APP_FIREBASE) {
  const VueFire = require('vuefire')
  Vue.use(VueFire)
}

if (process.env.VUE_APP_GA !== 'false') {
  analytics(process.env.VUE_APP_GA, router, process.env.NODE_ENV === 'production', process.env.VUE_APP_DEBUG_GA === 'true')
}

require('vuetify/src/stylus/app.styl')

Vue.config.productionTip = false

Vue.filter('era', era)
Vue.filter('link', link)
Vue.filter('titled', titled)
Vue.filter('number', number)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
})
