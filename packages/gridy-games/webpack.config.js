const path = require('path')
// const fs = require('fs')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const loadMinified = require('./build/load-minified')

const NODE_ENV = process.env.NODE_ENV

const setPath = function (folderName) {
  return path.join(__dirname, folderName)
}

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

const buildingForLocal = () => {
  return (NODE_ENV === 'development')
}

// Not extracting CSS because its not compatible yet.
// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701
// Should be working soon.
// const extractCSS = new ExtractTextPlugin({
//   filename: "css/styles.[hash].css",//"[name].[contenthash].css",
//   disable: process.env.NODE_ENV === "development"
// });

const extractHTML = new HtmlWebpackPlugin({
  filename: 'index.html',
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  },
  template: setPath('/src/index.ejs'),
  environment: process.env.NODE_ENV,
  isLocalBuild: buildingForLocal(),
  serviceWorkerLoader: `<script>${loadMinified(buildingForLocal() ? './build/service-worker-dev.js' : './build/service-worker-prod.js')}</script>`
})

const config = {
  /**
   * You can use these too for bigger projects. For now it is 0 conf mode for me!
   */
  // entry: {
  //   build: path.join(setPath('src'), 'index.js'),
  //   vendor: path.join(setPath('src'), 'vendor.js')
  // },
  // output: {
  //   path: buildingForLocal() ? path.resolve(__dirname) : setPath('dist'), //this one sets the path to serve
  //   publicPath: setPublicPath(),
  //   filename: buildingForLocal() ? 'js/[name].js' : 'js/[name].[hash].js'
  // },

  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      // 'vue$': 'vue/dist/vue.esm.js'
      'Tone': 'tone/Tone',
      'd3-color': resolve('plugins/dummy'),
      'd3-format': resolve('plugins/dummy')
    }
  },
  output: {
    globalObject: 'self'
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all' // Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    }
  },
  resolveLoader: {
    modules: [setPath('node_modules')]
  },
  mode: buildingForLocal() ? 'development' : 'production',
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  plugins: [
    extractHTML,
    // extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + NODE_ENV + '"'
      },
      'process.APP_VERSION': JSON.stringify(require('./package').version),
      'process.APP_BUILD': JSON.stringify(new Date().toISOString()),
      'process.APP_DEPENDENCIES': JSON.stringify(require('./package').dependencies)
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: 'static',
      ignore: ['.*']
    }]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'gridy-games',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}', 'dist/**/icon-web.svg'],
      minify: true,
      logger: () => {},
      stripPrefix: 'dist/',
      runtimeCaching: [{
        urlPattern: /^https:\/\/ajax\.googleapis\.com\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
        handler: 'cacheFirst'
      }
      ]
    })
  ],
  module: {
    rules: [{
      test: /\.ts$/,
      loaders: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/,
      include: [resolve('lib')]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        // postcss: [require('postcss-cssnext')()],
        // options: {
        //     extractCSS: true
        // },
        loaders: {
          js: 'babel-loader'
        }
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    },
      // {
      //   test: /\.css$/,
      //   use: extractCSS.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader", "autoprefixer-loader"]
      //   })
      // },
    {
      test: /\.styl$/,
      use:
          /* buildingForLocal() ?
          extractCSS.extract({
            fallback: "style-loader",
            use: ['css-loader', 'autoprefixer-loader', 'stylus-loader']
          }) : */
          [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader' // creates style nodes from JS strings
          }, {
            loader: 'stylus-loader' // compiles Stylus to CSS
          }
          ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader',
      query: {
        name: '[name].[ext]?[hash]',
        // useRelativePath: buildingForLocal()
        useRelativePath: true
      }
    }
    ]
  }
}

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config.plugins.push(new BundleAnalyzerPlugin({
    defaultSizes: 'gzip'
  }))
}

module.exports = config
