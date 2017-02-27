import members from './components/members/reducer.js'
import approve from './components/approve/reducer.js'

export default (state, component, action) => {

  if(state === undefined) {

    return {
      members: members(undefined, action),
      approve: approve(undefined, action)
    }

  } else if(component === 'members') {

    return {
      ...state,
      members: members(state.members, action)
    }

  } else if(component === 'approve') {

    return {
      ...state,
      approve: approve(state.approve, action)
    }

  } else {

    return state

  }

}
