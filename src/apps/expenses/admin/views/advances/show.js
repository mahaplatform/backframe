import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  render() {
    const { advance } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          { advance.is_approved === true && <div className="ui center aligned green inverted segment">This advance has been approved</div> }
          { advance.is_approved === false && <div className="ui center aligned red inverted segment">This advance has been rejected</div> }
          { advance.is_approved === null && <div className="ui center aligned blue inverted segment">This advance has not yet been reviewed</div> }
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content">
        </div>
      </div>
    )
  }

  _getDetails() {
    const { advance } = this.props
    return {
      items: [
        { label: 'Date ', content: advance.date, format: 'date' },
        { label: 'Project ', content: advance.project.title },
        { label: 'Expense Type ', content: advance.expense_type.description },
        { label: 'Vendor ', content: advance.vendor.name },
        { label: 'Description ', content: advance.description },
        { label: 'Amount ', content: advance.amount, format: 'currency' },
        { label: 'Approved By ', content: advance.approved_by.full_name },
        { label: 'Reason Rejected ', content: advance.reason_rejected }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Advance',
  rights: ['expenses.manage_expenses'],
  tasks: [
    { label: 'Edit Advance', modal: Edit }
  ],
  resources: {
    advance: `/admin/expenses/advances/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
