import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'

class Show extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...this._getDetails()} />
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
        { label: 'User', content: trip.user.full_name },
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
  rights: ['expenses.access_reports'],
  resources: {
    trip: `/admin/expenses/reports/trips/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
