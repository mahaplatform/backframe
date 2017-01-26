import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Cordova from '../cordova'
import Electron from '../electron'
import Browser from '../browser'

export class Host extends React.Component {

  render() {
    const { children, style } = this.props
    if(style === 'cordova') {
      return <Cordova>{ children }</Cordova>
    } else if(style === 'electron') {
      return <Electron>{ children }</Electron>
    } else if(style === 'browser') {
      return <Browser>{ children }</Browser>
    } else {
      return null
    }
  }

  componentDidMount() {
    const { onSet } = this.props
    if(navigator.userAgent.search('Cordova') >= 0) {
      onSet('cordova')
    } else if(navigator.userAgent.search('Electron') >= 0) {
      onSet('electron')
    } else {
      onSet('browser')
    }
  }

}

const mapStateToProps = (state, props) => ({
  style: state.host.style
})

const mapDispatchToProps = {
  onSet: actions.set
}

export default connect(mapStateToProps, mapDispatchToProps)(Host)
