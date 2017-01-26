import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from './actions'

class Security extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object,
    history: React.PropTypes.object
  }

  static propTypes = {
    error: React.PropTypes.string,
    question: React.PropTypes.string,
    token: React.PropTypes.string,
    status: React.PropTypes.string,
    user: React.PropTypes.object
  }

  render() {
    const { question, status, user } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <img src={ user.photo } className="photo" />
          <h1>{ user.full_name }</h1>
          <h4>{ user.email }</h4>
          <p>Before we reset your password, please answer the following security question.</p>
          <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
            <div className="field answer-field">
              <label>{question.text}</label>
              <input className="form-control" autoComplete="off" placeholder="Answer" type="text" ref="answer" />
            </div>
            <div className="field">
              <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Continue <i className="right chevron icon" /></button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const answer = $(this.refs.answer)
    setTimeout(function() { answer.focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { error, status } = this.props
    if(prevProps.status != status) {
      if(status === 'verified') {
        this.context.history.push('/admin/reset/password')
      } else if(status == 'failure') {
        this.context.flash.set('info', error)
      }
    }
  }

  _handleSubmit(event) {
    const { onVerify, question, token } = this.props
    const answer = $(this.refs.answer).val()
    onVerify(token, question.index, answer)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = state => ({
  error: state.reset.error,
  question: state.reset.question,
  token: state.reset.token,
  status: state.reset.status,
  user: state.reset.user
})

const mapDispatchToProps = {
  onVerify: actions.verify
}

export default connect(mapStateToProps, mapDispatchToProps)(Security)
