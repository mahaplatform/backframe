import React from 'react'
import Form from 'admin/components/form'

class Edit extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Account',
      method: 'patch',
      endpoint: '/admin/account',
      action: '/admin/account',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name' },
            { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name' },
            { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email' },
            { label: 'Photo', name: 'photo', type: 'filefield', multiple: false, endpoint: '/api/admin/uploads' }
          ]
        }
      ]
    }
  }

}

export default Edit
