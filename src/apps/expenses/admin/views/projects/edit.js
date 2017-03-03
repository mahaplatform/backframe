import React from 'react'
import Form from 'admin/components/form'

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
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title' },
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Code' },
            { label: 'Is Active', name: 'is_active', type: 'checkbox', defaultValue: true }
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
