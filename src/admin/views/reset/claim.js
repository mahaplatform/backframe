import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Claim extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object,
    history: React.PropTypes.object
  }

  render() {
    const { status } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <div className="ui form">
            {status === 'initialized' &&
              <div>
                <div className="ui active centered inline loader"></div>
                <p>Fetching your account...</p>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onSetToken(this.props.params.id)
  }

  componentDidUpdate(prevProps) {
    const { error, status, token, onClaim } = this.props
    if(prevProps.status != status) {
      if(status === 'initialized') {
        window.setTimeout(function() {
          onClaim(token)
        }, 1500)
      } else if(status == 'failure') {
        this.context.flash.set('info', error)
        this.context.history.push('/admin/forgot')
      } else if(status == 'claimed') {
        this.context.history.push('/admin/reset/security')
      }
    }
  }

}

const mapStateToProps = state => state.reset

const mapDispatchToProps = {
  onSetToken: actions.setToken,
  onClaim: actions.claim
}

export default connect(mapStateToProps, mapDispatchToProps)(Claim)
