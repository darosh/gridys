module.exports = {
  transform: {
    '^.+\\.tsx?$': '@gridy/build/node_modules/ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'js'
  ]
}
