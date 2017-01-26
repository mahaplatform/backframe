import React from 'react'
import $ from 'jquery'

class Security extends React.Component {

  render() {
    return (
      <div className="chrome-session chrome-signin">
        <div className="chrome-session-widget">
          <h1>MyCCE</h1>
          <h3>Cornell Cooperative Extension of Tompkins County</h3>
          <p>Before we reset your account, please answer this security question to verify your identity:</p>
          <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
            <div className="field question-field">
              <div className="ui selection dropdown" ref="question_1">
                <input type="hidden" name="question_id" ref="question_1_id" />
                <i className="dropdown icon"></i>
                <div className="default text">Question</div>
                <div className="menu">
                  <div className="item" data-value="1">Question 1</div>
                  <div className="item" data-value="0">Question 2</div>
                </div>
              </div>
            </div>
            <div className="field answer-field">
              <input className="form-control" autoComplete="off" placeholder="Answer" type="text" ref="answer_1" />
            </div>
            <div className="field question-field">
              <div className="ui selection dropdown" ref="question_1">
                <input type="hidden" name="question_id" ref="question_1_id" />
                <i className="dropdown icon"></i>
                <div className="default text">Question</div>
                <div className="menu">
                  <div className="item" data-value="1">Question 1</div>
                  <div className="item" data-value="0">Question 2</div>
                </div>
              </div>
            </div>
            <div className="field answer-field">
              <input className="form-control" autoComplete="off" placeholder="Answer" type="text" ref="answer_1" />
            </div>
            <div className="field">
              <button className="ui fluid large button">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  componentDidMount() {
    $(this.refs.question).dropdown()
  }

  _handleSubmit() {

  }

}

export default Security
