import React from 'react'

export class Avatar extends React.Component {

  static propTypes = {
    user: React.PropTypes.object
  }

  render() {
    const { user } = this.props
    if(user.photo) {
      return <img src={user.photo} className="avatar" />
    } else {
      return (
        <div className="avatar">
          <div className="avatar-badge">
            <div className="avatar-initials">
              <div className="avatar-text">
                { user.initials }
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

}

export default Avatar
