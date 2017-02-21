import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'

class Show extends React.Component {

  render() {
    const { expense } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          { expense.is_approved === true && <div className="ui center aligned green inverted segment">This expense has been approved</div> }
          { expense.is_approved === false && <div className="ui center aligned red inverted segment">This expense has been rejected</div> }
          { expense.is_approved === null && <div className="ui center aligned blue inverted segment">This expense has not yet been reviewed</div> }
          <Details {...this._getDetails()} />
          <div className="ui fluid buttons">
            <button className="ui red button">Reject</button>
            <div className="or"></div>
            <button className="ui green button">Approve</button>
          </div>
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
        { label: 'User ', content: expense.user.full_name },
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
  tasks: [],
  resources: {
    expense: `/admin/expenses/approvals/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
