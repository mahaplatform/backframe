import React from 'react'
import Form from 'admin/components/form'

class ExpenseTypes extends React.Component {

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
      title: 'Edit Expense Type',
      method: 'post',
      action: `/admin/expenses/projects/${this.context.container.params.id}/expense_types`,
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Expense Type', endpoint: `/admin/expenses/projects/${this.context.container.params.id}/expense_types/unassigned`, sort: 'code', value: 'id', text: 'text' }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.container.refresh('project_expense_types')
    this.context.modal.pop()
  }

}

export default ExpenseTypes
