import Expense from '../../../models/expense'

const expenseProcessor = (action, is_approved) => {

  return req => {

    return Expense.where({ id: req.params.id }).fetch().then(resource => {

      return resource.save({ is_approved }, { patch: true }).then(() => resource)

    }).catch(err => {

      if(err.errors) throw({ code: 422, message: `Unable to ${action} expense`, errors: err.toJSON() })

      throw(err)

    })

  }

}

export const approveProcessor = expenseProcessor('approve', true)

export const rejectProcessor = expenseProcessor('reject', false)
