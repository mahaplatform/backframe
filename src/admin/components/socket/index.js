import React from 'react'
import SocketClient from 'socket.io-client'
import { connect } from 'react-redux'

class Socket extends React.Component {

  static childContextTypes = {
    socket: React.PropTypes.object
  }

  static propTypes = {
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.socket = SocketClient()
  }

  getChildContext() {
    return {
      socket: this.socket
    }
  }

}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Socket)
