import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  render() {
    const { trip } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          { trip.is_approved === true && <div className="ui center aligned green inverted segment">This trip has been approved</div> }
          { trip.is_approved === false && <div className="ui center aligned red inverted segment">This trip has been rejected</div> }
          { trip.is_approved === null && <div className="ui center aligned blue inverted segment">This trip has not yet been reviewed</div> }
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content">
        </div>
      </div>
    )
  }

  _getDetails() {
    const { trip } = this.props
    const approved_by_label = trip.is_approved ? 'Approved By' : 'Rejected By'
    const approved_by_value = trip.approved_by ? trip.approved_by.full_name : null
    const approved_at_label = trip.is_approved ? 'Approved At' : 'Rejected At'
    return {
      items: [
        { label: 'Date', content: trip.date, format: 'date' },
        { label: 'Project', content: trip.project.title },
        { label: 'Time Leaving', content: trip.time_leaving },
        { label: 'Time Arriving', content: trip.time_arriving },
        { label: 'Odometer Start', content: trip.odometer_start },
        { label: 'Odometer End', content: trip.odometer_end },
        { label: 'Distance', content: trip.total_miles },
        { label: 'Rate', content: trip.mileage_rate, format: 'currency' },
        { label: 'Amount', content: trip.amount, format: 'currency' },
        { label: approved_by_label, content: approved_by_value },
        { label: approved_at_label, content: trip.approved_at, format: 'datetime' },
        { label: 'Reason Rejected', content: trip.reason_rejected }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Trip',
  rights: ['expenses.manage_expenses'],
  tasks: [
    { label: 'Edit Trip', modal: Edit }
  ],
  resources: {
    trip: `/admin/expenses/trips/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
