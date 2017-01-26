import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import { getActiveTeam } from 'admin/components/admin/selectors'

class Teams extends React.Component {

  static contextTypes = {
    admin: React.PropTypes.object,
    drawer: React.PropTypes.object,
    history: React.PropTypes.object
  }

  static propTypes = {
    team: React.PropTypes.object,
    teams: React.PropTypes.array
  }

  render() {
    const { sessions, team, teams } = this.props
    return (
      <div className="chrome-navigation-panel">
        <div className="chrome-navigation-header">
          <div className="chrome-navigation-header-back">
            <img src={ team.logo } />
          </div>
          <div className="chrome-navigation-header-team">
            Manage Teams
          </div>
          <div className="chrome-navigation-header-next" onClick={ this._handleToggleMode.bind(this) }>
            <i className="chevron down icon" />
          </div>
        </div>
        <div className="chrome-navigation-body">
          <div className="chrome-navigation-teams">
            { teams.map((team, index) => {
              return (
                <div key={`team_${index}`}className="chrome-navigation-team">
                  <div className="chrome-navigation-team-logo" onClick={ this._handleChangeTeam.bind(this, index) }>
                    <img src={ team.logo } />
                    { sessions[team.id] && sessions[team.id].user.unread > 0 &&
                      <div className="chrome-navigation-team-label">{ sessions[team.id].user.unread }</div>
                    }
                  </div>
                  <div className="chrome-navigation-team-title" onClick={ this._handleChangeTeam.bind(this, index) }>
                    { team.title }
                  </div>
                  <div className="chrome-navigation-team-active" onClick={this._handleSignout.bind(this, index)}>
                    <i className="power icon" />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="chrome-navigation-team-add" onClick={ this._handleAddTeam.bind(this) }>
            <div className="chrome-navigation-team-add-button">
              <div className="chrome-navigation-team-add-button-image">
                <i className="icon plus" />
              </div>
            </div>
            <div className="chrome-navigation-team-add-text">
              Add team
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleToggleMode() {
    this.props.onToggleMode()
  }

  _handleChangeTeam(index) {
    this.context.admin.chooseTeam(index)
    this.context.drawer.close()
    this.context.history.reset({ pathname: '/admin' })
  }

  _handleAddTeam() {
    this.context.drawer.close()
    this.context.history.push({ pathname: '/admin/signin' })
  }

  _handleSignout(index) {
    if(this.props.teams.length === 1) {
      this.context.drawer.close()
      window.setTimeout(() => {
        this.context.admin.removeTeam(index)
      }, 100)
    } else {
      this.context.admin.removeTeam(index)
    }
  }

}

const mapStateToProps = (state, props) => ({
  sessions: state.admin.sessions,
  team: getActiveTeam(state),
  teams: state.admin.teams
})

const mapDispatchToProps = {
  onReset: actions.toggleMode,
  onToggleMode: actions.toggleMode
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
