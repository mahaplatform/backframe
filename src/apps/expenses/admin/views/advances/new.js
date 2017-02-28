import React from 'react'
import Form from 'admin/components/form'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Advance',
      method: 'post',
      action: '/admin/expenses/advances',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Project', required: true, endpoint: '/admin/expenses/projects', key: 'id', value: 'title' },
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Expense Type', required: true, endpoint: '/admin/expenses/expense_types', key: 'id', value: 'title' },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Vendor', required: true, endpoint: '/admin/expenses/vendors', key: 'id', value: 'name' },
            { label: 'Delivery Method', name: 'delivery_method', type: 'select', placeholder: 'Delivery Method', required: true, options: [ { value: 'mail', text: 'Mail' }, { value: 'pickup', text: 'Pickup' }] },
            { label: 'Date Needed', name: 'date_needed', type: 'datefield', placeholder: 'Date Needed', required: true },
            { label: 'Amount', name: 'amount', type: 'textfield', placeholder: 'Amount', required: true },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description', required: true }
          ]
        }
      ]
    }
  }

}

export default New
