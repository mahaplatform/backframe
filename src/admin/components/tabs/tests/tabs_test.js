import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import reducer from '../reducer'
import * as actionTypes from '../action_types'
import { Tabs } from '../index'
import Tab from '../tab'

describe('tabs', () => {

  describe('reducer', () => {

    it('it sets the defaults', () => {
      let state = undefined
      let action = {
        type: ''
      }
      let expected = {
        active: 0
      }
      expect(reducer(state, action)).to.be.eql(expected)
    })

    it('it changes the tab', () => {
      let state = {
        active: 0
      }
      let action = {
        type: actionTypes.CHANGE_TAB,
        index: 1
      }
      let expected = {
        active: 1
      }
      expect(reducer(state, action)).to.be.eql(expected)
    })

  })

  describe('tabs', () => {

    it('renders with tabs and pane', () => {
      const Two = (props) => {
        return <div>Two</div>
      }
      const onChangeTab = spy()
      const config = {
        tabs: [
          { label: 'One', content: 'One' },
          { label: 'Two', content: Two },
          { label: 'Two', content: <p>Three</p>  }
        ],
        active: 1,
        onChangeTab
      }
      const tabs = shallow(
        <Tabs {...config} />
      )
      expect(tabs.is('div.tabs')).to.be.truthy
      expect(tabs.children().length).to.equal(2)

      const menu = tabs.childAt(0)
      expect(menu.is('div.ui.top.attached.tabular.menu')).to.be.truthy
      expect(menu.children().length).to.equal(config.tabs.length)

      const pane = tabs.childAt(1)
      expect(pane.is('div.ui.bottom.attached.active.tab.segment')).to.be.truthy
    })


  })

  describe('tab', () => {

    it('renders an inactive tab', () => {
      const tab = shallow(
        <Tab label="Details" index={1} active={false} />
      )
      expect(tab.is('div.item')).to.be.truthy
      expect(tab.text()).to.equal('Details')
    })

    it('renders an active tab', () => {
      const tab = shallow(
        <Tab label="Details" index={1} active={true} />
      )
      expect(tab.is('div.item.active')).to.be.truthy
      expect(tab.text()).to.be.equal('Details')
    })

  })

})
