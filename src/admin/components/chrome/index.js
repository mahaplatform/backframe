import React from 'react'
import { connect } from 'react-redux'
import { getActiveUser } from '../admin/selectors'
import Topbar from './topbar'

export class Chrome extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    teams: React.PropTypes.array,
    user: React.PropTypes.object
  }

  render() {
    const { children, user } = this.props
    if(!user) return null
    return (
      <div className="chrome">
        <Topbar />
        <div className="chrome-workspace">
          { children }
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, props) => ({
  user: getActiveUser(state)
})

export default connect(mapStateToProps)(Chrome)
