import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import $ from 'jquery'
import * as actions from './actions'

export class Password extends React.Component {

  static contextTypes = {
    admin: React.PropTypes.object,
    flash: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propTypes = {
    error: React.PropTypes.string,
    show: React.PropTypes.bool,
    status: React.PropTypes.string,
    team: React.PropTypes.object,
    user: React.PropTypes.object,
    onPassword: React.PropTypes.func
  }

  render() {
    const { show, status, user } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <div className="chrome-signin">
            <img src={ user.photo } className="photo" />
            <h1>{ user.full_name }</h1>
            <h4>{ user.email }</h4>
            <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
              <div className="field password-field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input className="form-control" autoComplete="off" placeholder="Password" type={ show ? 'text' : 'password' } ref="password" />
                  <a onClick={ this._handleTogglePassword.bind(this) }>{ show ? 'HIDE' : 'SHOW' }</a>
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Signin</button>
              </div>
            </form>
            <p><Link to={{ pathname: '/admin/signin/email', state: 'slide-back' }}>Not you?</Link></p>
            <p><a onClick={ this._handleForgot.bind(this) }>Forgot your password?</a></p>
          </div>
        </div>
      </div>
    )
  }

  componentWillMount() {
    if(!this.props.user) {
      this.context.router.push({ pathname: '/admin/signin', state: 'static' })
    }
  }

  componentDidMount() {
    const password = $(this.refs.password)
    window.setTimeout(function() { password.click().focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { error, status, team, token } = this.props
    if(prevProps.status !== status) {
      if(status === 'failure') {
        this.context.flash.set('info', error)
      } else if(status === 'success') {
        this.context.admin.addTeam(team, token)
        this.context.router.push({ pathname: '/admin', state: 'fade' })
      }
    }
  }

  _handleSubmit(event) {
    $(this.refs.password).click().focus()
    const { team, user, onPassword } = this.props
    const password = $(this.refs.password).val()
    onPassword(team.id, user.email, password)
    event.preventDefault()
    return false
  }

  _handleTogglePassword() {
    this.props.onTogglePassword()
  }

  _handleForgot() {
    const { team, user } = this.props
    this.props.onForgot(team.id, user.email)
  }

}

const mapStateToProps = state => ({
  error: state.signin.error,
  show: state.signin.show,
  status: state.signin.status,
  team: state.signin.team,
  token: state.signin.token,
  user: state.signin.user
})

const mapDispatchToProps = {
  onPassword: actions.password,
  onTogglePassword: actions.togglePassword,
  onForgot: actions.forgot
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
