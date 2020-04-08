const got = require('got')
const { decamelizeKeys } = require('xcase')
const debug = require('debug')('@got-api/gitlab')
const { Api, middleware } = require('@got-api/base')
const { getApiInfo } = require('@got-api/base/utils')
const path = require('path')
const QueryBuilder = require('./QueryBuilder')

const {
  GITLAB_TOKEN,
  GITLAB_ENDPOINT = 'https://gitlab.com/api/v4'
} = process.env

class Gitlab extends Api {
  static get QueryBuilder () {
    return QueryBuilder
  }

  constructor (options = {}) {
    super(options)
    const { ua, client } = getApiInfo(path.resolve(__dirname, '..'))
    const { endpoint = GITLAB_ENDPOINT, token = GITLAB_TOKEN } = options
    this.got = got.extend({
      timeout: 3000,
      prefixUrl: endpoint,
      headers: {
        'user-agent': ua,
        'x-sdk-client': client,
        'PRIVATE-TOKEN': token
      },
      hooks: {
        init: [
          requestOptions => {
            const { searchParams = {} } = requestOptions
            Object.assign(requestOptions, {
              searchParams: decamelizeKeys(searchParams)
            })
            debug(requestOptions)
          }
        ]
      },
      handlers: [
        middleware.error({ errorName: 'GitlabError' }),
        middleware.parse(),
        middleware.token({ key: 'PRIVATE-TOKEN' })
      ]
    })
  }
}

module.exports = Gitlab
