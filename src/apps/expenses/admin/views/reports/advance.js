import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import ApprovalStatus from '../../components/approval_status'

class Show extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <ApprovalStatus {...this.props.advance} />
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content" />
      </div>
    )
  }

  _getDetails() {
    const { advance } = this.props
    const approved_by_label = advance.is_approved ? 'Approved By' : 'Rejected By'
    const approved_by_value = advance.approved_by ? advance.approved_by.full_name : null
    const approved_at_label = advance.is_approved ? 'Approved At' : 'Rejected At'
    return {
      items: [
        { label: 'Date Needed', content: advance.date_needed, format: 'date' },
        { label: 'User', content: advance.user.full_name },
        { label: 'Project', content: advance.project.title },
        { label: 'Expense Type', content: advance.expense_type.description },
        { label: 'Vendor', content: advance.vendor.name },
        { label: 'Delivery Method', content: advance.delivery_method },
        { label: 'Description', content: advance.description },
        { label: 'Amount', content: advance.amount, format: 'currency' },
        { label: approved_by_label, content: approved_by_value },
        { label: approved_at_label, content: advance.approved_at, format: 'datetime' },
        { label: 'Reason Rejected', content: advance.reason_rejected }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Advance',
  rights: ['expenses.access_reports'],
  resources: {
    advance: `/admin/expenses/reports/advances/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
