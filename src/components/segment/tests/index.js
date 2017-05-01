import { expect } from 'chai'

const buildSegment = require('../index').default()

export default () => {

  it('succeeds', () => {

    const routes = buildSegment({
      authenticated: true,
      prefix: '/foo',
      routes: [
        {
          method: 'get',
          path: 'bar',
          handler: (req, res) => 'result'
        }, {
          method: 'get',
          path: 'bar',
          handler: (req, res) => 'result'
        }
      ]
    })

  })

    it('merges events from backframe and route', () => {

      const backframeOptions = {
        plugins: [
          {
            alterRequest: 1,
            before: 1,
            after: 1,
            alterRecord: 1
          }
        ]
      }

      const routeOptions = {
        alterRequest: [2,3],
        before: [2,3],
        processor: 'foo',
        after: [2,3],
        alterRecord: [2,3],
        responder: 'bar',
        method: 'get',
        path: '/foo'
      }

      const expected = {
        method: 'get',
        path: '/foo',
        handler: {
          alterRequest: [1,2,3],
          before: [1,2,3],
          processor: 'foo',
          after: [1,2,3],
          alterRecord: [1,2,3],
          responder: 'bar'
        }
      }

      const route = buildRoute(backframeOptions)(routeOptions)

      expect(route).is.eql(expected)

    })

}
