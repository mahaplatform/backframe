exports.seed = (knex, Promise) => {
  return knex('activities').del().then(() => {
    return knex('activities').insert([
      {
        id: 1,
        team_id: 1,
        user_id: 1,
        story_id: 1,
        app_id: 2,
        url: '/admin/expenses/projects/1',
        subject_type: 'project',
        subject_text: 'Primitive Pursuits',
        created_at: '2016-04-01'
      }, {
        id: 2,
        team_id: 1,
        user_id: 1,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'food for party',
        object1_type: 'project',
        object1_text: 'Primitive Pursuits',
        created_at: '2016-04-02'
      }, {
        id: 3,
        team_id: 1,
        user_id: 95,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'food for party',
        object1_type: 'project',
        object1_text: 'Primitive Pursuits',
        created_at: '2016-04-02'
      }, {
        id: 4,
        team_id: 1,
        user_id: 49,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'food for party',
        object1_type: 'project',
        object1_text: 'Primitive Pursuits',
        created_at: '2016-04-02'
      }, {
        id: 5,
        team_id: 1,
        user_id: 54,
        story_id: 1,
        app_id: 2,
        url: '/admin/expenses/projects/2',
        subject_type: 'project',
        subject_text: 'Eat Smart New York',
        created_at: '2016-04-03'
      }, {
        id: 6,
        team_id: 1,
        user_id: 19,
        story_id: 1,
        app_id: 2,
        url: '/admin/expenses/projects/3',
        subject_type: 'project',
        subject_text: 'Website Platform',
        created_at: '2016-04-03'
      }, {
        id: 7,
        team_id: 1,
        user_id: 13,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'food for party',
        object1_type: 'project',
        object1_text: 'Eat Smart New York',
        created_at: '2016-04-04'
      }, {
        id: 8,
        team_id: 1,
        user_id: 13,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'website hosting',
        object1_type: 'project',
        object1_text: 'Eat Smart New York',
        created_at: '2016-04-04'
      }, {
        id: 9,
        team_id: 1,
        user_id: 48,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'website hosting',
        object1_type: 'project',
        object1_text: 'Eat Smart New York',
        created_at: '2016-04-05'
      }, {
        id: 10,
        team_id: 1,
        user_id: 13,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'website hosting',
        object1_type: 'project',
        object1_text: 'Eat Smart New York',
        created_at: '2016-04-05'
      }, {
        id: 11,
        team_id: 1,
        user_id: 21,
        story_id: 1,
        app_id: 2,
        url: '/admin/expenses/projects/3',
        subject_type: 'project',
        subject_text: 'Website Platform',
        created_at: '2016-04-05'
      }, {
        id: 12,
        team_id: 1,
        user_id: 21,
        story_id: 1,
        app_id: 2,
        url: '/admin/expenses/projects/3',
        subject_type: 'project',
        subject_text: 'Website Platform',
        created_at: '2016-04-05'
      }, {
        id: 13,
        team_id: 1,
        user_id: 49,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'food for party',
        object1_type: 'project',
        object1_text: 'Primitive Pursuits',
        created_at: '2016-04-06'
      }, {
        id: 14,
        team_id: 1,
        user_id: 64,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'food for party',
        object1_type: 'project',
        object1_text: 'Primitive Pursuits',
        created_at: '2016-04-07'
      }, {
        id: 15,
        team_id: 1,
        user_id: 49,
        story_id: 2,
        app_id: 2,
        url: '/admin/expenses/expenses',
        subject_type: 'expense',
        subject_text: 'food for party',
        object1_type: 'project',
        object1_text: 'Primitive Pursuits',
        created_at: '2016-04-08'
      }
    ])
  })
}
