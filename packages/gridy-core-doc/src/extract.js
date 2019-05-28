const { readFileSync, writeFileSync } = require('fs')

const SOURCE = process.argv[2]

const file = readFileSync(SOURCE, 'utf-8').replace(/\r\n/g, '\n')

const scripts = file.split('      script: function (Gridy) {\n').slice(1)

const data = scripts.map(s => s.split('      }\n')[0].trimEnd().split('\n').map(s => s.replace(/^        /, '')).join('\n'))

writeFileSync(`${SOURCE}.json`, JSON.stringify(data, null, 2))
