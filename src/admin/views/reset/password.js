import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from './actions'

class Password extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propTypes = {
    error: React.PropTypes.string,
    status: React.PropTypes.string,
    user: React.PropTypes.object,
    onPassword: React.PropTypes.func
  }

  render() {
    const { status, user } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <img src={ user.photo } className="photo" />
          <h1>{ user.full_name }</h1>
          <h4>{ user.email }</h4>
          <p>Please enter and confirm your new password.</p>
          <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
            <div className="field email-field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input className="form-control" autoComplete="off" placeholder="Password" type="password" ref="password" />
              </div>
            </div>
            <div className="field password-field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input className="form-control" autoComplete="off" placeholder="Confirm Password" type="password" ref="confirm" />
              </div>
            </div>
            <div className="field">
              <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Reset Password <i className="right chevron icon" /></button>
              </div>
          </form>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const password = $(this.refs.password)
    setTimeout(function() { password.focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { error, status, token } = this.props
    if(prevProps.status != status) {
      if(status === 'complete') {
        this.context.flash.set('success', 'Your password was successfully reset')
      } else if(status == 'failure') {
        this.context.flash.set('info', error)
      }
    }
  }

  _handleSubmit(event) {
    const { onReset, token } = this.props
    const password = $(this.refs.password).val()
    const confirm = $(this.refs.confirm).val()
    onReset(token, password, confirm)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = state => ({
  error: state.reset.error,
  token: state.reset.token,
  status: state.reset.status,
  user: state.reset.user
})

const mapDispatchToProps = {
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
