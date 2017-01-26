import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

export class History extends React.Component {

  static childContextTypes = {
    history: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    history: React.PropTypes.array,
    goBack: React.PropTypes.func,
    push: React.PropTypes.func
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.props.onPush(this.props.location.pathname)
  }

  componentDidUpdate(prevProps) {
    const { location, history, onPush } = this.props
    if(history.length === 0) {
      onPush({ pathname: '/admin', state: 'static' })
    } else {
      const route = history[history.length - 1]
      const pathname = route.pathname || route
      if(history.length < prevProps.history.length) {
        this.context.router.push({ pathname, state: 'back' })
      } else if(history.length > prevProps.history.length) {
        const state = route.state || 'next'
        this.context.router.push({ pathname, state })
      } else if(location.pathname !== prevProps.location.pathname && location.pathname !== pathname && location.state !== 'back') {
        onPush({ pathname: location.pathname, state: location.state })
      }
    }
  }

  getChildContext() {
    return {
      history: {
        goBack: this.props.onGoBack,
        push: this.props.onPush,
        reset: this.props.onReset
      }
    }
  }

}

const mapStateToProps = state => ({
  history: state.history
})

const mapDispatchToProps = {
  onPush: actions.push,
  onGoBack: actions.goBack,
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
