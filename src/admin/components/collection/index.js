import React from 'react'
import * as actions from './actions'
import component from 'admin/components/component'
import Infinite from 'admin/components/infinite'
import Results from './results'

class Collection extends React.Component {

  static contextTypes = {
    location: React.PropTypes.object
  }

  static propTypes = {
    all: React.PropTypes.number,
    columns: React.PropTypes.array,
    endpoint: React.PropTypes.string,
    entity: React.PropTypes.string,
    filters: React.PropTypes.array,
    filter: React.PropTypes.object,
    layout: React.PropTypes.func,
    link: React.PropTypes.string,
    params: React.PropTypes.object,
    recordActions: React.PropTypes.array,
    sort: React.PropTypes.object,
    total: React.PropTypes.number,
    onFilter: React.PropTypes.func,
    onSort: React.PropTypes.func
  }

  render() {
    const { params } = this.props
    if(params) {
      return (
        <Infinite { ...this._getInfinite() }>
          <Results { ...this.props } />
        </Infinite>
      )
    } else {
      return null
    }
  }

  componentDidMount() {
    const filter = this.props.filter || {}
    const sort = this.props.sort || {
      key: 'created_at',
      order: 'desc'
    }
    this.props.onSetParams(filter, sort)
  }

  _getInfinite() {
    const { endpoint, params } = this.props
    return {
      endpoint,
      sort: params.sort,
      filter: params.filter
    }
  }

}

const mapStateToProps = (state, props) => ({
  params: state.collection[props.cid].params
})

const mapDispatchToProps = {
  onFilter: actions.filter,
  onSetParams: actions.setParams,
  onSort: actions.sort
}

export default component(mapStateToProps, mapDispatchToProps, Collection, 'collection', true)
