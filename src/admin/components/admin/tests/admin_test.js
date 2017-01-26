import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { Admin } from '../index'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

describe('admin', () => {

  describe('reducer', () => {

    it('it sets the defaults', () => {
      const state = undefined
      const action = {
        type: ''
      }
      const expected = {
        active: null,
        status: 'pending',
        teams: [],
        sessions: {}
      }
      expect(reducer(state, action)).to.be.eql(expected)
    })

  })

  describe('component', () => {

    it('it renders empty if status is pending', () => {

      const config = {
        status: 'pending',
        teams: [],
        sessions: {},
        addTeam: () => {},
        chooseTeam: () => {},
        removeTeam: () => {},
        onLoadSession: () => {},
        onLoadTeams: () => {},
        onSaveTeams: () => {}
      }
      const admin = shallow(
        <Admin { ...config }>
          children
        </Admin>
      )
      expect(admin.is('div')).to.be.truthy
      expect(admin.text()).to.be.nil
    })

    it('it renders children if status is success', () => {

      const config = {
        status: 'success',
        teams: [],
        sessions: {},
        addTeam: () => {},
        chooseTeam: () => {},
        removeTeam: () => {},
        onLoadSession: () => {},
        onLoadTeams: () => {},
        onSaveTeams: () => {}
      }
      const admin = shallow(
        <Admin { ...config }>
          children
        </Admin>
      )
      expect(admin.is('div')).to.be.truthy
      expect(admin.text()).to.equal('children')
    })

    it('it calls onLoadTeams when it mounts', () => {

      const onLoadTeams = spy()
      const config = {
        status: 'success',
        teams: [],
        sessions: {},
        addTeam: () => {},
        chooseTeam: () => {},
        removeTeam: () => {},
        onLoadSession: () => {},
        onLoadTeams,
        onSaveTeams: () => {}
      }
      shallow(
        <Admin { ...config } />
      )
      expect(onLoadTeams.calledOnce).to.be.truthy

    })

    it('it calls onSaveTeams when teams are added or removed', () => {

      const onSaveTeams = spy()
      const config = {
        active: 0,
        teams: [
          { id: 1 }
        ],
        sessions: {},
        status: 'success',
        addTeam: () => {},
        chooseTeam: () => {},
        removeTeam: () => {},
        onLoadSession: () => {},
        onLoadTeams: () => {},
        onSaveTeams
      }
      const admin = shallow(
        <Admin { ...config } />,
        { lifecycleExperimental: true }
      )
      expect(onSaveTeams.callCount).to.equal(0)
      admin.setProps({ teams: [
        { id: 1 },
        { id: 2 }
      ]})
      expect(onSaveTeams.callCount).to.equal(1)
      expect(onSaveTeams.calledWith([
        { id: 1 },
        { id: 2 }
      ])).to.be.truthy
      admin.setProps({ teams: [
        { id: 1 }
      ]})
      expect(onSaveTeams.callCount).to.equal(2)
      expect(onSaveTeams.calledWith([
        { id: 1 }
      ])).to.be.truthy

    })

    it('it calls onLoadSession when a new team is chosen if session is empty', () => {

      const onLoadSession = spy()
      const config = {
        active: 0,
        status: 'success',
        teams: [
          { id: 1, token: '1234' },
          { id: 2, token: '5678' }
        ],
        sessions: {},
        addTeam: () => {},
        chooseTeam: () => {},
        removeTeam: () => {},
        onLoadSession,
        onLoadTeams: () => {},
        onSaveTeams: () => {}
      }
      const admin = shallow(
        <Admin { ...config } />,
        { lifecycleExperimental: true }
      )
      expect(onLoadSession.callCount).to.equal(0)
      admin.setProps({
        active: 1
      })
      expect(onLoadSession.callCount).to.equal(1)
      expect(onLoadSession.calledWith(1, '5678')).to.be.truthy

    })

  })

  it('it does not calls onLoadSession when a new team is chosen if session is already loaded', () => {

    const onLoadSession = spy()
    const onLoadTeams = spy()
    const onSaveTeams = spy()
    const config = {
      active: 0,
      status: 'success',
      teams: [
        { id: 1, token: '1234' },
        { id: 2, token: '5678' }
      ],
      sessions: {
        '1234': {}
      },
      addTeam: () => {},
      chooseTeam: () => {},
      removeTeam: () => {},
      onLoadSession,
      onLoadTeams,
      onSaveTeams
    }
    const admin = shallow(
      <Admin { ...config } />,
      { lifecycleExperimental: true }
    )
    expect(onLoadSession.callCount).to.equal(0)
    admin.setProps({
      active: 1
    })
    expect(onLoadSession.callCount).to.equal(0)

  })

})
