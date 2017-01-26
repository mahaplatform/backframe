import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Page } from '../index'

describe('page', () => {

  describe('forbidden', () => {

    // const config = {
    //   team: {
    //     title: 'Cornell Cooperative Extension of Tompkins County'
    //   }
    // }

    // const forbidden = shallow(
    //   <Forbidden { ...config } />
    // )

    // expect(forbidden.is('div.chrome-page')).to.be.truthy
    // expect(forbidden.children().length).to.equal(3)
    //
    // const helmet = forbidden.childAt(0)
    // expect(helmet.is('Helmet[title="Cornell Cooperative Extension of Tompkins County | 403 Forbidden"]')).to.be.truthy
    //
    // const header = forbidden.childAt(1)
    // expect(header.is('div.chrome-header')).to.be.truthy
    //
    // const back = header.childAt(0)
    // expect(back.is('div.chrome-back')).to.be.truthy
    //
    // const title = header.childAt(1)
    // expect(title.is('div.chrome-title')).to.be.truthy
    //
    // const more = header.childAt(2)
    // expect(more.is('div.chrome-more')).to.be.truthy
    //
    // const error = forbidden.childAt(2)
    // expect(error.is('div.chrome-error')).to.be.truthy
    //
    // const message = error.childAt(0)
    // expect(error.is('div.chrome-error-message')).to.be.truthy
    //
    // const icon = message.childAt(0)
    // expect(icon.is('i.warning.sign.icon')).to.be.truthy
    //
    // const statement = message.childAt(1)
    // expect(statement.is('h2')).to.be.truthy
    // expect(statement.text()).to.equal('You do not have permission to access this content')

  })

})
