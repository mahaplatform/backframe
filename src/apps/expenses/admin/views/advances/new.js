import React from 'react'
import Form from 'admin/components/form'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      project_id: null
    }
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const expense_type_endpoint = `/admin/expenses/projects/${this.state.project_id}/expense_types`
    const expense_type_disabled = (this.state.project_id === null)
    return {
      title: 'New Advance',
      method: 'post',
      action: '/admin/expenses/advances',
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
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Project', endpoint: '/admin/expenses/memberships', value: 'id', text: 'title' },
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Expense Type', endpoint: expense_type_endpoint, value: 'expense_type.id', text: 'expense_type.text', disabled: expense_type_disabled },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Vendor', required: true, endpoint: '/admin/expenses/vendors', value: 'id', text: 'name' },
            { label: 'Delivery Method', name: 'delivery_method', type: 'select', placeholder: 'Delivery Method', required: true, options: [ { key: 'mail', value: 'Mail' }, { key: 'pickup', value: 'Pickup' }] },
            { label: 'Date Needed', name: 'date_needed', type: 'datefield', placeholder: 'Date Needed', required: true },
            { label: 'Amount', name: 'amount', type: 'textfield', placeholder: 'Amount', required: true, prefix: '$' },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description', required: true }
          ]
        }
      ]
    }
  }

}

export default New
