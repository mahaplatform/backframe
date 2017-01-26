import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'
import $ from 'jquery'
import * as actions from './actions'

export class Password extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propTypes = {
    error: React.PropTypes.string,
    status: React.PropTypes.string,
    team: React.PropTypes.object,
    onEmail: React.PropTypes.func
  }

  render() {
    const { status, team } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <div className="chrome-signin">
            <img src={ team.logo } className="logo" />
            <h1>{ team.title }</h1>
            <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
              <div className="field email-field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input className="form-control" autoComplete="off" placeholder="Email" type="email" ref="email" />
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Continue <i className="right chevron icon" /></button>
                  <p><Link to={{ pathname: '/admin/signin', state: 'slide-back' }}>Wrong team?</Link></p>
                  { _.includes(team.strategies, 'cornell') && <p><a href="/admin/signin/cornell">Signin with CUWebAuth</a></p> }
                  { _.includes(team.strategies, 'google') && <p><a href="/admin/signin/google">Signin with Google</a></p> }
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  componentWillMount() {
    if(!this.props.team) {
      this.context.router.push({ pathname: '/admin/signin', state: 'static' })
    }
  }

  componentDidMount() {
    const email = $(this.refs.email)
    window.setTimeout(function() { email.click().focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { error, status } = this.props
    if(prevProps.status !== status) {
      if(status === 'failure') {
        this.context.flash.set('info', error)
      } else if(status === 'success') {
        this.context.router.push({ pathname: '/admin/signin/password', state: 'slide-next' })
      }
    }
  }

  _handleSubmit(event) {
    $(this.refs.email).click().focus()
    const { team, onEmail } = this.props
    const email = $(this.refs.email).val()
    onEmail(team.id, email)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = state => ({
  error: state.signin.error,
  status: state.signin.status,
  team: state.signin.team
})

const mapDispatchToProps = {
  onEmail: actions.email
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
