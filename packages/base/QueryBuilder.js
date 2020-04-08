const assert = require('assert')

class QueryBuilder {
  constructor (api) {
    assert(api)
    this.api = api
  }

  resource (name) {
    if (!this.apiUrl) {
      this.apiUrl = name
    } else {
      this.apiUrl += `/${name}`
    }
    return this
  }

  find (options) {
    assert(this.apiUrl)
    return this.api.request(this.apiUrl, { method: 'GET', ...options })
  }

  findById (key, options) {
    assert(this.apiUrl)
    return this.api.request(`${this.apiUrl}/${key}`, { method: 'GET', ...options })
  }

  delete (key) {
    assert(this.apiUrl)
    return this.api.request(`${this.apiUrl}/${key}`, { method: 'DELETE' })
  }

  create (json) {
    assert(this.apiUrl)
    return this.api.request(this.apiUrl, { method: 'POST', json })
  }

  update (key, json) {
    assert(this.apiUrl)
    return this.api.request(`${this.apiUrl}/${key}`, { method: 'PUT', json })
  }
}

module.exports = QueryBuilder
