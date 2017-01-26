import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { Tasks } from '../index'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

const Edit = props => <div />

describe('tasks', () => {

  describe('reducer', () => {

    it('it sets the defaults', () => {
      let state = undefined
      let action = {
        type: ''
      }
      let expected = null
      expect(reducer(state, action)).to.be.eql(expected)
    })

    it('it opens the tasks', () => {
      let state = null
      let action = {
        type: actionTypes.OPEN,
        tasks: [
          { label: 'Edit', modal: Edit }
        ]
      }
      let expected = [
        { label: 'Edit', modal: Edit }
      ]
      expect(reducer(state, action)).to.be.eql(expected)
    })

    it('it closes the tasks', () => {
      let state = [
        { label: 'Edit', modal: Edit }
      ]
      let action = {
        type: actionTypes.CLOSE
      }
      let expected = null
      expect(reducer(state, action)).to.be.eql(expected)
    })

  })

  describe('component', () => {

    const onOpen = spy()
    const onClose = spy()

    const config = {
      tasks: [
        { label: 'Task One', route: '/task/1' },
        { label: 'Task Two', route: '/task/2' }
      ],
      onOpen,
      onClose
    }

    // it('renders closed', () => {
    //   const tasks = shallow(
    //     <Tasks { ...config } showTasks={false}>
    //       <div>Page</div>
    //     </Tasks>
    //   )
    //   expect(tasks.is('Transition')).to.be.truthy
    //   expect(tasks.children().length).to.be.eql(0)
    // })
    //
    // it('renders open', () => {
    //   const tasks = shallow(
    //     <Tasks { ...config } showTasks={true} />
    //   )
    //   expect(tasks.is('Transition')).to.be.truthy
    //   expect(tasks.children().length).to.be.eql(2)
    //
    //   const overlay = tasks.childAt(0)
    //   expect(overlay.is('div.chrome-tasks-overlay')).to.be.truthy
    //   overlay.simulate('click')
    //   expect(onToggleTasks.calledOnce).to.be.truthy
    //
    //   const modal = tasks.childAt(1)
    //   expect(modal.is('div.chrome-tasks')).to.be.truthy
    //   expect(modal.children().length).to.be.eql(3)
    //
    //   const task_one = modal.childAt(0)
    //   expect(task_one.is('div.chrome-task')).to.be.truthy
    //   expect(task_one.text()).to.be.eql('Task One')
    //   task_one.simulate('click')
    //   expect(onChooseTask.calledOnce).to.be.truthy
    //
    //   const task_two = modal.childAt(1)
    //   expect(task_two.is('div.chrome-task')).to.be.truthy
    //   expect(task_two.text()).to.be.eql('Task Two')
    //   task_two.simulate('click')
    //   expect(onChooseTask.calledTwice).to.be.truthy
    //
    //   const task_cancel = modal.childAt(2)
    //   expect(task_cancel.is('div.chrome-cancel')).to.be.truthy
    //   expect(task_cancel.text()).to.be.eql('Cancel')
    //   task_cancel.simulate('click')
    //   expect(onToggleTasks.calledTwice).to.be.truthy
    // })

  })

})
