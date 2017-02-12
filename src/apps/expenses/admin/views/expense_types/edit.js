import React from 'react'
import Form from 'admin/components/form'

class Edit extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Expense Type',
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title' },
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Code' },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description' }
          ]
        }
      ]
    }
  }

}

export default Edit
