import React from 'react'
import { connect } from 'react-redux'
import Apps from './apps'
import Teams from './teams'

class Panel extends React.Component {

  render() {
    const { items, mode } = this.props
    return mode === 'apps' ? <Apps items={ items }/> : <Teams />
  }

}

const mapStateToProps = state => ({
  mode: state.navigation.mode
})

export default connect(mapStateToProps)(Panel)
