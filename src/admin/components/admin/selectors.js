import { createSelector } from 'reselect'

export const getActiveTeam = createSelector(
  state => state,
  state => {
    return state.admin.teams.reduce((active, team) => {
      return (team.active) ? team : active
    }, null)
  }
)

export const getActiveSession = createSelector(
  [state => state, getActiveTeam],
  (state, team) => {
    return team !== null && state.admin.sessions[team.id] !== undefined ? state.admin.sessions[team.id] : null
  }
)

export const getActiveUser = createSelector(
  [state => state, getActiveSession],
  (state, session) => {
    return session !== null ? session.user : null
  }
)

export const getApps = createSelector(
  [state => state, getActiveSession],
  (state, session) => {
    return session !== null ? session.apps : null
  }
)
