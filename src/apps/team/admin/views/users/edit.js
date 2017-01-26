import React from 'react'
import Form from 'admin/components/form'
import Roles from '../../components/roles'

class Edit extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit User',
      method: 'patch',
      endpoint: `/admin/team/users/${this.context.container.params.id}`,
      action: `/admin/team/users/${this.context.container.params.id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name' },
            { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name' },
            { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email' },
            { label: 'Roles', name: 'roles', type: Roles }
          ]
        }
      ]
    }
  }

}

export default Edit
