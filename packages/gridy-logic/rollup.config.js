import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  output: {
    globals: {
      '@gridy/core': 'Gridy'
    }
  },
  external: ['@gridy/core'],
  plugins: [
    resolve({
      mainFields: ['module'],
      modulesOnly: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
