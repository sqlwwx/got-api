const debug = require('debug')('@got-api/base/middleware/error')

module.exports = (options = {}) => {
  const { errorName } = options
  return async (ctx, next) => {
    try {
      return await next(ctx)
    } catch (err) {
      let body = (err.response && err.response.body) || ''
      if (body && typeof body === 'string') {
        try {
          body = JSON.parse(body)
        } catch (e) {
          debug(e, body)
        }
      }
      /* eslint-disable no-param-reassign */
      err.name = errorName
      if (body) {
        err.message = typeof body === 'string'
          ? body
          : body.message || err.message
      }
      /* eslint-enable no-param-reassign */
      throw err
    }
  }
}
