exports.seed = (knex, Promise) => {
    return knex('roles').del().then(() => {
        return knex('roles').insert([
            {
                id: 1,
                team_id: 1,
                title: 'Administrator',
                description: 'Sriracha bitters fixie bicycle rights, shoreditch lomo retro snackwave cold-pressed bespoke banjo synth beard keytar. '
            }, {
                id: 2,
                team_id: 1,
                title: 'Supervisor',
                description: 'Sriracha bitters fixie bicycle rights, shoreditch lomo retro snackwave cold-pressed bespoke banjo synth beard keytar. '
            }, {
                id: 3,
                team_id: 1,
                title: 'Finance',
                description: 'Sriracha bitters fixie bicycle rights, shoreditch lomo retro snackwave cold-pressed bespoke banjo synth beard keytar. '
            }, {
                id: 4,
                team_id: 1,
                title: 'Employee',
                description: 'Sriracha bitters fixie bicycle rights, shoreditch lomo retro snackwave cold-pressed bespoke banjo synth beard keytar. '
            }
        ])
    })
}
