import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Approve from '../../components/approve'

class Show extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object
  }

  render() {
    const { expense } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          { expense.is_approved === true && <div className="ui center aligned green inverted segment">This expense has been approved</div> }
          { expense.is_approved === false && <div className="ui center aligned red inverted segment">This expense has been rejected</div> }
          { expense.is_approved === null && <div className="ui center aligned blue inverted segment">This expense has not yet been reviewed</div> }
          <Details {...this._getDetails()} />
          { expense.is_approved === null && <Approve {...this._getApprove()} /> }
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

  _getApprove() {
    return {
      expense: this.props.expense,
      onChange: () => {
        this.context.container.refresh('expense')
      }
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
