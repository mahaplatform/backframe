import React from 'react'
import Form from 'admin/components/form'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Project',
      method: 'post',
      action: '/admin/expenses/projects',
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title' },
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Code' },
            { label: 'Is Active', name: 'is_active', type: 'checkbox', defaultValue: true }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.modal.pop()
    this.context.router.push(`/admin/expenses/projects/${project.id}`)
  }

}

export default New
