const { decamelizeKeys } = require('xcase')
const debug = require('debug')('@got-api/base/init')

module.exports = options => {
  const { searchParams = {} } = options
  options.searchParams = decamelizeKeys(searchParams)
  debug(options)
}
