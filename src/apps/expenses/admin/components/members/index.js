import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'admin/components/avatar'
import * as actions from './actions'
import _ from 'lodash'

class Members extends React.Component {

  static propTypes = {
  }

  render() {
    const { members } = this.props
    return (
      <div className="members">
        { members.map((user, index) => {
          return (
            <div key={`user${index}`} className="project-member">
              <Avatar user={ user  } />
              <p>
                <strong>{ user.full_name }</strong><br />
                { user.email }
              </p>
            </div>
          )
        })}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  members: state.expenses.members.members
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)
