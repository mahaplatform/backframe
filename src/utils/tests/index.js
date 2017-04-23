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
            beforeHooks: 1,
            afterHooks: 1,
            alterRecord: 1
          },{
            alterRequest: [2,3],
            beforeHooks: [2,3],
            afterHooks: [2,3],
            alterRecord: [2,3]
          }
        ]

        const expected = {
          alterRequest: [1,2,3],
          beforeHooks: [1,2,3],
          afterHooks: [1,2,3],
          alterRecord: [1,2,3]
        }

        expect(mergeHooks({}, plugins)).to.eql(expected)

      })

    })

  })

}
