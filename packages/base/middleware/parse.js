const { decamelizeKeys, camelizeKeys } = require('xcase')

module.exports = () => async (ctx, next) => {
  const { json } = ctx
  if (json) {
    ctx.json = decamelizeKeys(json)
  }
  const res = await next(ctx)
  if (!res.body) {
    return {}
  }
  const data = JSON.parse(res.body)
  if (Array.isArray(data)) {
    return data.map(camelizeKeys)
  }
  return camelizeKeys(data)
}
