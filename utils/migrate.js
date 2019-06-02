const { writeFileSync } = require('fs')
const cwd = process.cwd()
const file = `${cwd}/package.json`
const pkg = require(file)
const { basename } = require('path')

pkg.repository = `https://github.com/darosh/gridys/tree/master/packages/${basename(cwd)}`
pkg.license = `MIT`

if(pkg.devDependencies && pkg.devDependencies.typescript) {
  pkg.devDependencies.typescript = '3.4.5'
}

writeFileSync(file, JSON.stringify(pkg, null, 2))
