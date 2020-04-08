const debug = require('debug')('@got-api/base/middleware/token')

module.exports = (options = {}) => {
  const { key } = options
  return async (ctx, next) => {
    const { token, headers } = ctx
    if (token && !headers[key]) {
      ctx.headers[key] = token
    }
    debug(ctx.headers)
    return next(ctx)
  }
}
