import React from 'react'
import Form from 'admin/components/form'
import moment from 'moment'

class Edit extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Project',
      method: 'patch',
      endpoint: `/admin/expenses/projects/${this.context.container.params.id}`,
      action: `/admin/expenses/projects/${this.context.container.params.id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'Receipt', name: 'asset_id', type: 'filefield', endpoint: '/admin/uploads', prompt: 'Upload Receipt' },
            { label: 'Date', name: 'date', type: 'datefield', placeholder: 'Date Needed', defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Vendor', endpoint: '/admin/expenses/vendors', value: 'id', text: 'name' },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description' },
            { label: 'Amount', name: 'amount', type: 'textfield', placeholder: 'Amount', prefix: '$' },
            { label: 'Visa?', name: 'is_visa', type: 'checkbox' }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.container.refresh('project')
    this.context.modal.pop()
    this.context.router.push(`/admin/expenses/projects/${project.id}`)
  }

}

export default Edit
