const EventEmitter = require('events')
const QueryBuilder = require('./QueryBuilder')
const got = require('got')

class Api extends EventEmitter {
  constructor () {
    super()
    this.got = got
  }

  static get QueryBuilder () {
    return QueryBuilder
  }

  request (url, options = {}) {
    return this.got(url, options)
  }

  query () {
    return new this.constructor.QueryBuilder(this)
  }
}

module.exports = Api
