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
    const { expense } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
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
        { label: 'Receipt', content: expense.asset_id, format: Receipt },
        { label: 'Date', content: expense.date, format: 'date' },
        { label: 'User', content: expense.user.full_name },
        { label: 'Project', content: expense.project.title },
        { label: 'Expense Type', content: expense.expense_type.description },
        { label: 'Vendor', content: expense.vendor.name },
        { label: 'Description', content: expense.description },
        { label: 'Amount', content: expense.amount, format: 'currency' },
        { label: 'Reason Rejected', content: expense.reason_rejected }
      ]
    }
  }

  _getApprove() {
    return {
      type: 'expenses',
      id: this.props.expense.id,
      onChange: () => {
        this.context.history.push('/admin/expenses/approvals/expenses')
        this.context.flash.set('success', 'This expense was successfully approved')
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
  title: 'Approve Expense',
  rights: ['expenses.approve_expenses'],
  resources: {
    expense: `/admin/expenses/approvals/expenses/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
