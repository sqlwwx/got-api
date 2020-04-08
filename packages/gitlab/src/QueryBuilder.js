const assert = require('assert')
const BaseQueryBuilder = require('@got-api/base/QueryBuilder')

class QueryBuilder extends BaseQueryBuilder {
  group (name) {
    this.apiUrl = `groups/${encodeURIComponent(name)}`
    return this
  }

  project (name) {
    this.apiUrl = `projects/${encodeURIComponent(name)}`
    return this
  }

  variables () {
    assert(this.apiUrl)
    this.apiUrl += '/variables'
    return this
  }

  /**
   * list
   *
   * @param {number} page=1
   * @param {number} perPage=20 default: 20, max: 100
   * @returns {array}
   */
  list (page = 1, perPage = 20) {
    return this.find({
      searchParams: {
        perPage,
        page
      }
    })
  }
}

module.exports = QueryBuilder
