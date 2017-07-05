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
            beforeProcessor: 1,
            afterProcessor: 1,
            alterRecord: 1
          },{
            alterRequest: [2,3],
            beforeProcessor: [2,3],
            afterProcessor: [2,3],
            alterRecord: [2,3]
          }
        ]

        const expected = {
          alterRequest: [1,2,3],
          beforeProcessor: [1,2,3],
          afterProcessor: [1,2,3],
          alterRecord: [1,2,3]
        }

        expect(mergeHooks({}, plugins)).to.eql(expected)

      })

    })

  })

}
