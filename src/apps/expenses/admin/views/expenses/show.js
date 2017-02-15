import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  render() {
    const { expense } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content">
          { expense.is_approved === true && <div className="ui center aligned green inverted segment">This expense has been approved</div> }
          { expense.is_approved === false && <div className="ui center aligned red inverted segment">This expense has been rejected</div> }
          { expense.is_approved === null && <div className="ui center aligned blue inverted segment">This expense has not yet been reviewed</div> }
        </div>
      </div>
    )
  }

  _getDetails() {
    const { expense } = this.props
    return {
      items: [
        { label: 'Receipt ', content: expense.asset_id, format: Receipt },
        { label: 'Date ', content: expense.date, format: 'date' },
        { label: 'Project ', content: expense.project.title },
        { label: 'Expense Type ', content: expense.expense_type.description },
        { label: 'Vendor ', content: expense.vendor.name },
        { label: 'Description ', content: expense.description },
        { label: 'Amount ', content: expense.amount, format: 'currency' },
        { label: 'Reason Rejected ', content: expense.reason_rejected }

      ]
    }
  }

}

const Receipt = (props) => {
  return (
    <a href="">View Receipt</a>
  )
}


const mapPropsToPage = (props, context) => ({
  title: 'Expense',
  rights: [],
  tasks: [
    { label: 'Edit Expense', modal: Edit }
  ],
  resources: {
    expense: `/admin/expenses/expenses/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
