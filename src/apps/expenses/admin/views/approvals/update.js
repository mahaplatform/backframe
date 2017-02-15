import React from 'react'
import Form from 'admin/components/form'

class Approve extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      project_id: null
    }
  }

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Approve Expense',
      method: 'post',
      action: `/admin/expenses/approvals/${this.props.params.id}`,
      endpoint: `/admin/expenses/approvals/${this.props.params.id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      onChangeField: (key, value) => {
        if(key === 'project_id') {
          this.setState({
            project_id: value
          })
        }
      },
      sections: [
        {
          fields: [
            { label: 'Receipt', name: 'asset_id', type: 'text' },
            { label: 'Date', name: 'date', type: 'text', format: 'date' },
            { label: 'User', name: 'user.full_name', type: 'text' },
            { label: 'Project', name: 'project.title', type: 'text' },
            { label: 'Expense Type', name: 'expense_type.description', type: 'text' },
            { label: 'Vendor', name: 'vendor.name', type: 'text' },
            { label: 'Description', name: 'description', type: 'text' },
            { label: 'Amount', name: 'amount', type: 'text' },
            { label: 'Visa?', name: 'is_visa', type: 'text' }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.container.refresh('expenses')
    this.context.modal.pop()
  }


}

export default Approve
