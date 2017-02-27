import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import { getActiveTeam, getActiveUser } from 'admin/components/admin/selectors'
import { userHasRights } from './utils'

class Apps extends React.Component {

  static contextTypes = {
    admin: React.PropTypes.object,
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    history: React.PropTypes.object
  }

  static propTypes = {
    items: React.PropTypes.array,
    path: React.PropTypes.array,
    team: React.PropTypes.object,
    title: React.PropTypes.string,
    user: React.PropTypes.object,
    onBack: React.PropTypes.func,
    onForward: React.PropTypes.func,
    onToggleMode: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      items: props.items,
      path: props.path,
      title: props.title
    }
  }

  render() {
    const { team, user } = this.props
    const { items, path, title } = this.state
    return (
      <div className="chrome-navigation-panel">
        { path.length === 0 ?
          <div className="chrome-navigation-header">
            <div className="chrome-navigation-header-back">
              <img src={ team.logo } />
            </div>
            <div className="chrome-navigation-header-team">
              { team.title }
            </div>
            <div className="chrome-navigation-header-next" onClick={ this._handleToggleMode.bind(this) }>
              <i className="chevron up icon" />
            </div>
          </div> :
          <div className="chrome-navigation-header">
            <div className="chrome-navigation-header-back" onClick={ this._handleBack.bind(this) }>
              <i className="chevron left icon" />
            </div>
            <div className="chrome-navigation-header-title">
              { title }
            </div>
            <div className="chrome-navigation-header-next">
            </div>
          </div>
        }
        <div className="chrome-navigation-body">
          { path.length === 0 &&
            <div className="chrome-navigation-item" onClick={ this._handleDashboard.bind(this) }>
              <div className="chrome-navigation-item-icon">
                <i className="home icon" />
              </div>
              Dashboard
            </div>
          }
          { items.map((item, index) => {
            if(!item.rights || userHasRights(user, item.rights)) {
              return (
                <div key={`item_${index}`} className="chrome-navigation-item" onClick={ this._handleForward.bind(this, item, index)}>
                  { item.icon &&
                    <div className="chrome-navigation-item-icon">
                      <i className={`${item.icon} icon`} />
                      </div>
                  }
                  { item.label }
                  { item.items && <i className="chevron right icon" /> }
                </div>
              )
            }
          }) }
        </div>
      </div>
    )
  }

  _handleDashboard() {
    this.context.drawer.close()
    this.context.history.push({ pathname: '/admin', state: 'static' })
  }

  _handleForward(item, index) {
    if(item.route) {
      this.context.drawer.close()
      this.context.history.push({ pathname: item.route, state: 'static' })
    } else {
      this.props.onForward(index)
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleToggleMode() {
    this.props.onToggleMode()
  }

}

const getItems = (items, path) => {
  return path.reduce((newitems, index) => {
    return newitems.items[index]
  }, { items })
}

const mapStateToProps = (state, props) => ({
  items: getItems(props.items, state.navigation.path).items,
  title: getItems(props.items, state.navigation.path).label,
  path: state.navigation.path,
  team: getActiveTeam(state),
  user: getActiveUser(state)
})

const mapDispatchToProps = {
  onBack: actions.back,
  onForward: actions.forward,
  onToggleMode: actions.toggleMode
}

export default connect(mapStateToProps, mapDispatchToProps)(Apps)
