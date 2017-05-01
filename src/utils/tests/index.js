import { expect } from 'chai'
import { mergeHooks } from '../core'
import { checkOptionType } from '../options'

export default () => {

  describe('core', () => {

    describe('mergeHooks', () => {

      it('merges events', () => {

        const plugins = [
          {
            alterRequest: 1,
            before: 1,
            after: 1,
            alterRecord: 1
          },{
            alterRequest: [2,3],
            before: [2,3],
            after: [2,3],
            alterRecord: [2,3]
          }
        ]

        const expected = {
          alterRequest: [1,2,3],
          before: [1,2,3],
          after: [1,2,3],
          alterRecord: [1,2,3]
        }

        expect(mergeHooks({}, plugins)).to.eql(expected)

      })

    })

  })

}
