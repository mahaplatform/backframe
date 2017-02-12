exports.seed = (knex, Promise) => {
    return knex('expenses_expense_types').del().then(() => {
        return knex('expenses_expense_types').insert([
            {
                id: 1,
                team_id: 1,
                title: 'Test Expense Type',
                code: '1234'
            }, {
                id: 2,
                team_id: 1,
                title: 'Test Expense Type 2',
                code: '5678'
            }
        ])
    })
}
