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
      title: 'New Trip',
      method: 'post',
      action: '/admin/expenses/trips',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Project', required: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title' },
            { label: 'Date', name: 'date', type: 'datefield', placeholder: 'Date', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Description', name: 'description', type: 'textarea', required: true, placeholder: 'Description' },
            { label: 'Time Leaving', name: 'time_leaving', type: 'textfield', required: true, placeholder: 'Time Leaving' },
            { label: 'Time Arriving', name: 'time_arriving', type: 'textfield', required: true, placeholder: 'Time Arriving' },
            { label: 'Odometer Start', name: 'odometer_start', type: 'textfield', required: true, placeholder: 'Odometer Start' },
            { label: 'Odometer End', name: 'odometer_end', type: 'textfield', required: true, placeholder: 'Odometer End' }
          ]
        }
      ]
    }
  }

}

export default New
