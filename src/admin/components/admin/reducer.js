import * as actionTypes from './action_types'
import _ from 'lodash'

const INITIAL_STATE = {
  status: 'pending',
  teams: [],
  sessions: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_TEAMS_SUCCESS:
    return {
      ...state,
      status: 'success',
      teams: action.value || [],
      sessions: {}
    }

  case actionTypes.LOAD_TEAMS_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.ADD_TEAM:
    return {
      ...state,
      teams: [
        ...state.teams.map(team => {
          return {
            ...team,
            active: false
          }
        }),
        {
          ...action.team,
          token: action.token,
          active: true
        }
      ]
    }

  case actionTypes.CHOOSE_TEAM:
    return {
      ...state,
      teams: state.teams.map((team, index) => {
        return {
          ...team,
          active: (index === action.index)
        }
      })
    }

  case actionTypes.REMOVE_TEAM:
    const team = state.teams[action.index]
    const sessions = _.omit(state.sessions, [team.id])
    const teams = [
      ...state.teams.slice(0, action.index),
      ...state.teams.slice(action.index + 1)
    ]
    return {
      ...state,
      sessions,
      teams: teams.map((team, index) => {
        return {
          ...team,
          active: (index === teams.length - 1)
        }
      })
    }

  case actionTypes.LOAD_SESSION_SUCCESS:
    return {
      ...state,
      sessions: {
        ...state.sessions,
        [action.tid]: action.data
      }
    }


  default:
    return state
  }


}
