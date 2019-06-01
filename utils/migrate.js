const { writeFileSync } = require('fs')
const cwd = process.cwd()
const file = `${cwd}/package.json`
const pkg = require(file)
const { basename } = require('path')

pkg.repository = `https://github.com/darosh/gridys/tree/master/packages/${basename(cwd)}`
pkg.license = `MIT`

writeFileSync(file, JSON.stringify(pkg, null, 2))
