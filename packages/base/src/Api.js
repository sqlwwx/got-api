const EventEmitter = require('events')
const got = require('got')
const QueryBuilder = require('./QueryBuilder')


class ApiError extends Error {
  constructor (err) {
    super()
    this.name = err.name
    this.message = err.message
    Object.defineProperties(this, {
      options: {
        value: err.options,
        enumerable: false
      },
      response: {
        value: err.response,
        enumerable: false
      }
    })
    if (err.options) {
      this.method = err.options.method
      this.href = err.options.url.href
      this.headers = err.options.headers
      this.json = err.options.json
    }
    if (err.response) {
      this.statusCode = err.response.statusCode
      this.body = err.response.body
    }
  }
}

class Api extends EventEmitter {
  constructor () {
    super()
    this.got = got
  }

  static get QueryBuilder () {
    return QueryBuilder
  }

  request (url, options = {}) {
    return this.got(url, options).catch(err => {
      return Promise.reject(new ApiError(err))
    })
  }

  query () {
    return new this.constructor.QueryBuilder(this)
  }
}

module.exports = Api
