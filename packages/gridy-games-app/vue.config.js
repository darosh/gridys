const path = require('path')
const { readFileSync } = require('fs')
const USE_FIREBASE = false

const conf = {
  VUE_APP_VERSION: require('./package').version,
  VUE_APP_STORAGE_VERSION: require('./package').storageVersion,
  VUE_APP_BUILD: new Date().toISOString(),
  VUE_APP_DEPENDENCIES: JSON.stringify(deps()),
  VUE_APP_FIREBASE: JSON.stringify(firebase()),
  VUE_APP_GA: process.env.VUE_APP_GA || 'false',
  VUE_APP_DEBUG_GA: process.env.VUE_APP_DEBUG_GA || 'false'
}

Object.assign(process.env, conf)

function deps () {
  const d = require('./package').dependencies

  // d['@gridy/core'] = 'github:darosh/gridys'
  // d['@gridy/logic'] = 'github:darosh/gridys'

  return Object.keys(d).reduce((r, k) => {
    r[k] = d[k].startsWith('github') ? d[k] + ':' + require(path.join(k, 'package.json')).version : d[k]
    return r
  }, {})
}

function firebase () {
  if (!USE_FIREBASE) {
    return false
  }

  try {
    return JSON.parse(readFileSync('./.firebase.json', 'utf8'))
  } catch (ignore) {
    return false
  }
}

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.configFile = path.resolve(__dirname, '.eslintrc.js')
        return options
      })
  },
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: __dirname
        }
      }
    }
  }
}
