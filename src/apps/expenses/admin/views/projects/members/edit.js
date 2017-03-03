import React from 'react'
import Form from 'admin/components/form'

class DeleteButton extends React.Component {

  render() {
    return (
      <button className="ui fluid red button" onClick={this._handleClick.bind(this)}>
        {this.props.label}
      </button>
    )
  }

  _handleClick() {
    confirm(this.props.confirm)
  }

}

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
      title: 'Edit Member',
      method: 'patch',
      endpoint: `/admin/expenses/projects/${this.context.container.params.id}/members/${this.props.member_id}/edit`,
      action: `/admin/expenses/projects/${this.context.container.params.id}/members/${this.props.member_id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'User', name: 'user.full_name', type: 'text' },
            { label: 'Type', name: 'member_type_id', type: 'select', endpoint: '/admin/expenses/member_types', value: 'id', text: 'name' }
          ]
        }
      ],
      after: <DeleteButton {...this._getDeleteButton()} />
    }
  }

  _getDeleteButton() {
    return {
      label: 'Remove Member',
      confirm: 'Are you sure you want to delete this contact?'
    }
  }

  _handleSuccess(project) {
    this.context.container.refresh('members')
    this.context.modal.pop()
  }

}

export default Member
