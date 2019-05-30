import component from './components/Icon.vue'

export default function (bundle) {
  return Object.keys(bundle).reduce((r, key) => {
    r[key] = {
      component,
      props: {
        path: bundle[key]
      }
    }

    return r
  }, {})
}
