const fs = require('fs')
const compiled = new WebAssembly.Module(fs.readFileSync(__dirname + '/dist/optimized.wasm'))
const imports = {}
Object.defineProperty(module, 'exports', {
  get: () => new WebAssembly.Instance(compiled, imports).exports
})
