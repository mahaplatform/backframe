import React from 'react'
import { connect } from 'react-redux'
import { getActiveTeam } from '../admin/selectors'
import * as actions from './actions'

export class Notifications extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    queue: React.PropTypes.array.isRequired,
    onPushNotification: React.PropTypes.func.isRequired,
    onReadNotification: React.PropTypes.func.isRequired
  }

  render() {
    const { children, queue } = this.props
    return (
      <div>
        <div className="chrome-notifications">
          { queue.length > 0 &&
            <div className="ui raised segments">
              { queue.map((notification, index) => {
                return (
                  <div key={`notification_${index}`} className="ui segment">
                    <i className="remove icon" onClick={this.readNotification.bind(this, notification.id)}></i>
                    {notification.story.text}
                  </div>
                )
              })}
            </div>
          }
        </div>
        { children }
      </div>
    )
  }

  _handlePushNotification(message) {
    const { team } = this.props
    this.props.onPushNotification(team.title, message, team.logo)
  }

}

const mapStateToProps = (state, props) => ({
  host: state.host.style,
  queue: state.notifications.queue,
  team: getActiveTeam(state)
})

const mapDispatchToProps = {
  onPushNotification: actions.pushNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
