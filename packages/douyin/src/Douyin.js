const got = require('got')
const debug = require('debug')('@got-api/gitlab')
const { Api, middleware } = require('@got-api/base')
const decamelizeSearchParams = require('@got-api/base/init/decamelizeSearchParams')
const { getApiInfo } = require('@got-api/base/utils')
const path = require('path')

class Douyin extends Api {
  constructor (options = {}) {
    super(options)
    const { ua, client } = getApiInfo(path.resolve(__dirname, '..'))
    debug(options, ua, client)
    this.got = got.extend({
      timeout: 3000,
      prefixUrl: '',
      headers: {
        'user-agent': ua,
        'x-sdk-client': client
      },
      hooks: {
        init: [
          decamelizeSearchParams
        ]
      },
      handlers: [
        middleware.error({ errorName: 'DouyinError' }),
        middleware.parse()
      ]
    })
  }
}

module.exports = Douyin
