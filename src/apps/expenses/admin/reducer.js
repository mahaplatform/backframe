import members from './components/members/reducer.js'

export default (state, component, action) => {

  if(state === undefined) {

    return {
      members: members(undefined, action)
    }

  } else if(component === 'members') {

    return {
      ...state,
      members: members(state.members, action)
    }

  } else {

    return state

  }

}
