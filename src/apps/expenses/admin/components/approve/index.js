import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Approve extends React.Component {

  static propTypes = {
  }

  render() {
    return (
      <div className="ui fluid buttons">
        <button className="ui red button" onClick={ this._handleReject.bind(this) }>Reject</button>
        <div className="or"></div>
        <button className="ui green button" onClick={ this._handleApprove.bind(this) }>Approve</button>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(prevProps.status !== status) {
      this.props.onChange()
    }
  }

  _handleApprove() {
    this.props.onApprove(this.props.type, this.props.id)
  }

  _handleReject() {
    this.props.onReject(this.props.type, this.props.id)
  }

}

const mapStateToProps = state => ({
  status: state.expenses.approve.status
})

const mapDispatchToProps = {
  onApprove: actions.approve,
  onReject: actions.reject
}

export default connect(mapStateToProps, mapDispatchToProps)(Approve)
