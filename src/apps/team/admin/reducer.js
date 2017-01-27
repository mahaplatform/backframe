import access from './components/access/reducer.js'
import roles from './components/roles/reducer.js'

export default (state, component, action) => {

  if(state === undefined) {

    return {
      access: access(undefined, action),
      roles: roles(undefined, action)
    }

  } else if(component === 'access') {

    return {
      ...state,
      access: access(state.access, action)
    }

  } else if(component === 'roles') {

    return {
      ...state,
      roles: roles(state.roles, action)
    }

  } else {

    return state

  }

}
