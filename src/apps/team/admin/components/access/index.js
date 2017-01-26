import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

class Access extends React.Component {

  static propTypes = {
    access: React.PropTypes.array,
    onLoad: React.PropTypes.func,
    onToggleApp: React.PropTypes.func,
    onToggleRight: React.PropTypes.func
  }

  render() {
    const { access } = this.props
    return (
      <div className="access">
        { access.map((app, appindex) => {
          return (
            <div key={`app_${appindex}`} className="access-app">
              <div className="access-app-title">
                <div className="access-app-label">
                  { app.title }
                </div>
                <div className="access-app-input">
                  <i className={`toggle ${app.assigned ? 'on' : 'off'} icon`} onClick={ this._handleToggleApp.bind(this, appindex) } />
                </div>
              </div>
              <CSSTransitionGroup transitionName="expanded" component="div" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
                { app.assigned &&
                  <div className="access-rights">
                    { app.rights.length > 0 && app.rights.map((right, rightindex) => {
                      return (
                        <div key={`app_right_${rightindex}`} className="access-right">
                          <div className="access-right-label">
                            <strong>{ right.text }</strong><br />
                            { right.description }
                          </div>
                          <div className="access-right-input">
                            <i className={`toggle ${right.assigned ? 'on' : 'off'} icon`} onClick={ this._handleToggleRight.bind(this, appindex, rightindex) } />
                          </div>
                        </div>
                      )
                    })}
                    { app.rights.length === 0 &&
                      <div className="access-right-empty">
                        This app has no rights
                      </div>
                    }
                  </div>
                }
              </CSSTransitionGroup>
            </div>
          )
        })}
      </div>
    )
  }

  componentDidMount() {
    this.props.onLoad()
  }

  _handleToggleApp(index) {
    this.props.onToggleApp(index)
  }

  _handleToggleRight(appIndex, index) {
    this.props.onToggleRight(appIndex, index)
  }

}

const mapStateToProps = state => ({
  access: state.team.access.access
})

const mapDispatchToProps = {
  onLoad: actions.load,
  onToggleApp: actions.toggleApp,
  onToggleRight: actions.toggleRight
}

export default connect(mapStateToProps, mapDispatchToProps)(Access)
