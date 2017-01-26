import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from './actions'
import { getActiveTeam } from 'admin/components/admin/selectors'


export class Team extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object,
    router: React.PropTypes.object,
    admin: React.PropTypes.object
  }

  static propTypes = {
    admin: React.PropTypes.array,
    error: React.PropTypes.string,
    status: React.PropTypes.string,
    team: React.PropTypes.object,
    onTeam: React.PropTypes.func
  }

  render() {
    const { team } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <div className="chrome-signin">
            <h1>Sign in To Your Team</h1>
            <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
              <div className="field team-field">
                <div className="ui left icon input">
                  <i className="users icon"></i>
                  <input className="form-control" autoComplete="off" placeholder="team" type="text" ref="subdomain" />
                  <div className="suffix">.mycce.com</div>
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Continue <i className="right chevron icon" /></button>
                { team && <p><Link to={{ pathname: '/admin', state: 'slide-back' }}>Back to { team.title }</Link></p> }
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const subdomain = $(this.refs.subdomain)
    window.setTimeout(function() { subdomain.click().focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { error, status } = this.props
    if(prevProps.status !== status) {
      if(status === 'failure') {
        this.context.flash.set('info', error)
      } else if(status === 'success') {
        this.context.router.push({ pathname: '/admin/signin/email', state: 'slide-next' })
      }
    }
  }

  _handleSubmit(event) {
    $(this.refs.subdomain).click().focus()
    const { teams, onTeam } = this.props
    const subdomain = $(this.refs.subdomain).val()
    const index = _.findIndex(teams, { subdomain })
    if(index >= 0) {
      this.context.admin.chooseTeam(index)
      this.context.router.push({ pathname: '/admin', state: 'fade' })
    } else {
      onTeam(subdomain)
    }

    event.preventDefault()
    return false
  }

}

const mapStateToProps = state => ({
  error: state.signin.error,
  status: state.signin.status,
  teams: state.admin.teams,
  team: getActiveTeam(state)
})

const mapDispatchToProps = {
  onTeam: actions.team
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)
