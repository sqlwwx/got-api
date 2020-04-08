const assert = require('assert')
const Gitlab = require('.')

/* eslint-env jest */
describe('Gitlab', () => {
  describe('group Variables', () => {
    it('list', async () => {
      const gitlab = new Gitlab()
      const variables = await gitlab
        .query()
        .group('weidian-lab/lab')
        .variables()
        .list(1, 100)
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
