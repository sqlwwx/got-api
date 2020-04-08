const os = require('os')
const path = require('path')

exports.getApiInfo = pkgDir => {
  // eslint-disable-next-line
  const pkg = require(path.resolve(pkgDir, 'package.json'))
  return {
    ua: `${pkg.name} (${os.platform()}; ${os.arch()}) Node.js/${process.version} Core/${pkg.version}`,
    client: `Node.js(${process.version}), ${pkg.name}: ${pkg.version}`
  }
}
