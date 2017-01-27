import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import _ from 'lodash'

class Roles extends React.Component {

  static propTypes = {
    assigned: React.PropTypes.array,
    roles: React.PropTypes.array,
    onLoad: React.PropTypes.func,
    onToggleRole: React.PropTypes.func,
    onChange: React.PropTypes.func
  }

  render() {
    const { assigned, roles } = this.props
    return (
      <div className="roles">
        { roles.map((role, index) => {
          return (
            <div key={`role_${index}`} className="role">
              <div className="role-label">
                <strong>{ role.title }</strong><br />
                { role.description }
              </div>
              <div className="role-input">
                <i className={`toggle ${_.includes(assigned, role.id) ? 'on' : 'off'} icon`} onClick={ this._handleToggleRole.bind(this, index) } />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSetAssigned, onLoad } = this.props
    if(defaultValue) {
      onSetAssigned(defaultValue)
    }
    onLoad()
  }

  componentDidUpdate(prevProps) {
    const { assigned, onChange } = this.props
    if(assigned !== prevProps.assigned) {
      onChange(assigned)
    }
  }

  _handleToggleRole(index) {
    this.props.onToggle(index)

  }

}

const mapStateToProps = state => ({
  roles: state.team.roles.roles,
  assigned: state.team.roles.assigned
})

const mapDispatchToProps = {
  onLoad: actions.load,
  onSetAssigned: actions.setAssigned,
  onToggle: actions.toggle
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles)
