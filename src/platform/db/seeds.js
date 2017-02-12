exports.seed = (knex, Promise) => {

    return knex('security_questions').del().then(() => {

        return knex('security_questions').insert([
            {
                text: 'What is the name of your first pet?'
            }, {
                text: 'What is your mother\'s maiden name?'
            }, {
                text: 'What is the first name of your maternal grandfather?'
            }, {
                text: 'What is the first name of your youngest subling?'
            }, {
                text: 'In what city were you born?'
            }
        ])

    }).then(() => {

        return knex('app_categories').del()

    }).then(() => {

        return knex('app_categories').insert([
            {
                title: 'administration'
            }, {
                title: 'communication'
            }, {
                title: 'education'
            }, {
                title: 'finance'
            }, {
                title: 'management'
            }, {
                title: 'productivity'
            }
        ])

    })

}
