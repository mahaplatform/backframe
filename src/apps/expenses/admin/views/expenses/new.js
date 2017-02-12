import React from 'react'
import Form from 'admin/components/form'
import moment from 'moment'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Expense',
      method: 'post',
      action: '/admin/expenses/expenses',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'Receipt', name: 'upload_id', type: 'filefield', endpoint: '/admin/uploads', prompt: 'Upload Receipt' },
            { label: 'Date', name: 'date_needed', type: 'datefield', placeholder: 'Date Needed', defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Project', endpoint: '/admin/expenses/projects', value: 'id', text: 'title' },
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Expense Type', endpoint: '/admin/expenses/expense_types', value: 'id', text: 'title' },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Vendor', endpoint: '/admin/expenses/vendors', value: 'id', vatextlue: 'name' },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description' },
            { label: 'Amount', name: 'amount', type: 'textfield', placeholder: 'Amount' },
            { label: 'Visa?', name: 'is_visa', type: 'checkbox' }
          ]
        }
      ]
    }
  }

}

export default New
