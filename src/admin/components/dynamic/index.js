import React from 'react'
import _ from 'lodash'
import * as actions from './actions'
import component from 'admin/components/component'

class Dynamic extends React.Component {

  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    key: React.PropTypes.string.isRequired,
    records: React.PropTypes.array,
    status: React.PropTypes.string,
    value: React.PropTypes.string.isRequired
  }

  render() {
    const { children, key, records, status, value } = this.props
    const options = records.map(record => {
      return {
        key: _.get(record, key),
        value: _.get(record, value)
      }
    })
    return React.cloneElement(children, { options, status })
  }

  componentDidMount() {
    const { endpoint } = this.props
    this.props.onFetch(this.props.cid, endpoint, { '$skip': 0 })
  }

}

const mapStateToProps = (state, props) => ({
  records: state.dynamic[props.cid].records,
  status: state.dynamic[props.cid].status
})

const mapDispatchToProps = {
  onFetch: actions.fetch
}

export default component(mapStateToProps, mapDispatchToProps, Dynamic, 'dynamic', true)
