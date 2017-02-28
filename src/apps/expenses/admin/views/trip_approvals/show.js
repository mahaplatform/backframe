import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Approve from '../../components/approve'

class Show extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object,
    flash: React.PropTypes.object
  }

  render() {
    const { trip } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...this._getDetails()} />
          { trip.is_approved === null && <Approve {...this._getApprove()} /> }
        </div>
      </div>
    )
  }

  _getDetails() {
    const { trip } = this.props
    return {
      items: [
        { label: 'Date ', content: trip.date, format: 'date' },
        { label: 'User ', content: trip.user.full_name },
        { label: 'Project ', content: trip.project.title },
        { label: 'Description ', content: trip.description },
        { label: 'Reason Rejected ', content: trip.reason_rejected }
      ]
    }
  }

  _getApprove() {
    return {
      type: 'trips',
      id: this.props.trip.id,
      onChange: () => {
        this.context.history.push('/admin/expenses/approvals/trips')
        this.context.flash.set('success', 'This trip was successfully approved')
      }
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Approve Trip',
  rights: ['expenses.approve_expenses'],
  resources: {
    trip: `/admin/expenses/approvals/trips/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
