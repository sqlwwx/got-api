const assert = require('assert')
const Gitlab = require('.')

/* eslint-env jest */
describe('Gitlab', () => {
  describe('group Variables', () => {
    it('list', async () => {
      const gitlab = new Gitlab()
      const variables = await gitlab
        .query()
        .group('weidian-lab')
        .variables()
        .list(1, 1)
      assert(variables.length === 1)
      assert.deepEqual(
        Object.keys(variables[0]),
        'variableType,key,value,protected,masked'.split(',')
      )
    })
    it('restful', async () => {
      const gitlab = new Gitlab()
      const api = gitlab
        .query()
        .group('weidian-lab/lab')
        .variables()
      await assert.rejects(
        api.delete('TEST'), {
          name: 'GitlabError',
          message: '404 GroupVariable Not Found'
        }
      )
      await assert.rejects(
        () => api.delete('TEST'),
        err => {
          assert(err.options)
          assert(err.response)
          assert(err.href)
          assert(err.method)
          assert(err.statusCode)
          assert(err.body)
          return true
        }
      )
      assert(
        !(await api.list(1, 100)).find(({ key }) => key === 'TEST')
      )
      const data = {
        key: 'TEST',
        variableType: 'env_var',
        value: 'test1',
        protected: false,
        masked: false
      }
      await assert.rejects(
        () => api.create({}),
        err => {
          assert(err.name, 'GitlabError')
          assert(err.statusCode, 400)
          assert(err.message, 'key is missing, value is missing')
          return true
        }
      )
      const ret = await api.create(data)
      assert.deepEqual(ret, data)
      assert(
        (await api.list(1, 100)).find(({ key, value }) => {
          return key === 'TEST' && value === 'test1'
        })
      )
      await api.update('TEST', {
        value: 'test2'
      })
      assert(
        (await api.list(1, 100)).find(({ key, value }) => key === 'TEST' && value === 'test2')
      )
      await api.delete('TEST')
    })
  })
})
