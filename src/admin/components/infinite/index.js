import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import component from 'admin/components/component'
import * as actions from './actions'

class Infinite extends React.Component {

  static childContextTypes = {
    infinite: React.PropTypes.object
  }

  static propTypes = {
    all: React.PropTypes.number,
    cid: React.PropTypes.string,
    endpoint: React.PropTypes.string,
    filter: React.PropTypes.object,
    loaded: React.PropTypes.number,
    records: React.PropTypes.array,
    status: React.PropTypes.string,
    sort: React.PropTypes.object,
    total: React.PropTypes.number,
    onFetch: React.PropTypes.func,
    onReset: React.PropTypes.func
  }

  static defaultProps = {
    filter: {},
    sort: {
      key: 'created_at',
      order: 'desc'
    }
  }

  render() {
    const { all, children, loaded, records, status, total } = this.props
    return React.cloneElement(children, { all, loaded, records, status, total })
  }

  componentDidMount() {
    this._handleFetch(0)
  }

  componentDidUpdate(prevProps) {
    const { filter, sort, loaded, records, status } = this.props
    if(prevProps.sort !== sort || prevProps.filter !== filter) {
      this.props.onReset(this.props.cid)
    } else if(prevProps.status !== status) {
      if(status === 'loaded' && records.length > 0) {
        this._attachScrollListener()
      } else if(status === 'pending') {
        this._handleFetch(loaded)
      } else if(status === 'completed') {
        this._detachScrollListener()
      }
    }
  }

  componentWillUnmount() {
    if(this._container()) {
      this._detachScrollListener()
    }
  }

  getChildContext() {
    return {
      infinite: {
        refresh: this._handleReset.bind(this)
      }
    }
  }

  _handleReset() {
    this.props.onReset(this.props.cid)
  }

  _container() {
    if(!this.container) {
      this.container = ReactDOM.findDOMNode(this)
    }
    return this.container
  }

  _listener() {
    if(!this.listener) {
      this.listener = _.throttle(this._scrollListener.bind(this), 100)
    }
    return this.listener
  }

  _attachScrollListener() {
    const { status } = this.props
    const el = this._container()
    if(!el || status == 'loading') return
    el.addEventListener('scroll', this._listener(), true)
    el.addEventListener('resize', this._listener(), true)
    this._scrollListener()
  }

  _detachScrollListener() {
    const el = this._container()
    if(!el) return
    el.removeEventListener('scroll', this._listener(), true)
    el.removeEventListener('resize', this._listener(), true)
  }

  _scrollListener() {
    const { loaded, status, total } = this.props
    const el = this._container()
    if(!el || status == 'loading') return
    const bottomScrollPos = el.scrollTop + el.offsetHeight
    const bottomPosition = (el.scrollHeight - bottomScrollPos)
    if(bottomPosition < 250 && loaded < total) {
      this._handleFetch(loaded)
    }
  }

  _handleFetch(loaded) {
    const { cid, endpoint, filter, sort, onFetch } = this.props
    const $sort = (sort.order === 'desc' ? '-' : '') + sort.key
    onFetch(cid, endpoint, { ...filter, $skip: loaded, $sort })
  }

}

const mapStateToProps = (state, props) => ({
  all: state.infinite[props.cid].all,
  loaded: state.infinite[props.cid].loaded,
  records: state.infinite[props.cid].records,
  status: state.infinite[props.cid].status,
  total: state.infinite[props.cid].total
})

const mapDispatchToProps = {
  onFetch: actions.fetch,
  onReset: actions.reset
}

export default component(mapStateToProps, mapDispatchToProps, Infinite, 'infinite', true)
