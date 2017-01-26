import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getActiveTeam } from 'admin/components/admin/selectors'
import * as actions from './actions'

export default (mapComponentStateToProps, mapComponentDispatchToProps, PlainComponent, namespace, isNew) => {

  const wrappedMapComponentDispatchToProps = (dispatch, props) => {
    const actions = Object.keys(mapComponentDispatchToProps).reduce((actions, key) => {
      return {
        ...actions,
        [key]: function() {
          const oldArguments = Array.prototype.slice.call(arguments)
          const result = mapComponentDispatchToProps[key](...oldArguments)
          if(_.isFunction(result)) {
            dispatch(result)
          } else {
            dispatch({
              ...mapComponentDispatchToProps[key](...oldArguments),
              tid: props.tid,
              cid: props.cid
            })
          }
        }
      }
    }, {})
    return actions
  }

  const WrappedComponent = connect(mapComponentStateToProps, wrappedMapComponentDispatchToProps)(PlainComponent)

  if(!isNew) {
    return WrappedComponent
  }

  class Component extends React.Component {

    static propTypes = {
      components: React.PropTypes.array,
      teams: React.PropTypes.array,
      team: React.PropTypes.object,
      onAdd: React.PropTypes.func,
      onRemove: React.PropTypes.func
    }

    constructor(props) {
      super(props)
      this.tid = (props.team) ? props.team.id : null
      this.cid = _.random(100000, 999999).toString(36)
      this.index = `${this.tid}-${this.cid}`
      this.identifier = `${namespace}-${this.index}`
    }

    render() {
      const { children, components } = this.props
      if(components && _.includes(components, this.identifier)) {
        const childProps = _.omit(this.props, ['components'])
        return <WrappedComponent {...childProps} tid={this.tid} cid={this.cid} identifier={this.index}>{ children }</WrappedComponent>
      }
      return null
    }

    componentDidMount() {
      this.props.onAdd(namespace, this.tid, this.cid)
    }

    componentWillUnmount() {
      this.props.onRemove(namespace, this.tid, this.cid)
    }

  }

  const mapStateToProps = state => ({
    components: state.components,
    teams: state.admin.teams,
    team: getActiveTeam(state)
  })

  const mapDispatchToProps = {
    onAdd: actions.add,
    onRemove: actions.remove
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}
