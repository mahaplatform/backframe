import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'

class Container extends React.Component {

  static childContextTypes = {
    container: React.PropTypes.object
  }

  static propTypes = {
    onFetchResource: React.PropTypes.func
  }

  render() {
    const { children } = this.props
    return children
  }

  getChildContext() {
    return {
      container: {
        fetch: this._fetchResources.bind(this),
        refresh: this._refreshResources.bind(this),
        clear: this._clearResources.bind(this),
        params: this.props.params
      }
    }
  }

  _fetchResources(resources) {
    _.forOwn(resources, (endpoint, prop) => {
      this.props.onFetchResource(prop, endpoint)
    })
  }

  _refreshResources(props) {
    props = (_.isString(props)) ? [props] : props
    props.map(prop => {
      const endpoint = this.props.routes[prop]
      if(endpoint) {
        this.props.onFetchResource(prop, endpoint)
      }
    })
  }

  _clearResources(props) {
    props.map(prop => {
      this.props.onClearResource(prop)
    })
  }

}

const mapStateToProps = (state, props) => ({
  routes: state.container.routes
})

const mapDispatchToProps = {
  onFetchResource: actions.fetchResource,
  onClearResource: actions.clearResource
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
