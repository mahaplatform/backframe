import React from 'react'
import Form from 'admin/components/form'

class Member extends React.Component {

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
      title: 'Add Member',
      method: 'post',
      action: `/admin/expenses/projects/${this.context.container.params.id}/members`,
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'User', name: 'user_id', type: 'lookup', prompt: 'Find a User', endpoint: `/admin/expenses/projects/${this.context.container.params.id}/members/unassigned`, value: 'id', text: 'full_name' },
            { label: 'Is Owner', name: 'is_owner', type: 'checkbox', defaultValue: false }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.container.refresh('members')
    this.context.modal.pop()
  }

}

export default Member
