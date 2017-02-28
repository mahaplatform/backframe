const moment = require('moment')

module.exports = {
  tableName: 'expenses_trips',
  records: [
    {
      id: 1,
      team_id: 1,
      user_id: 1,
      project_id: 1,
      date: moment().subtract(6, 'days').format('YYYY-MM-DD'),
      description: 'driving',
      time_leaving: '10:00:00',
      time_arriving: '11:00:00',
      odometer_start: 102150,
      odometer_end: 102295,
      total_miles: 145,
      mileage_rate: 2.50,
      amount: 362.50,
      is_approved: true,
      approved_by_id: 47,
      approved_at: moment().subtract(10, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      reason_rejected: null,
      created_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }, {
      id: 2,
      team_id: 1,
      user_id: 1,
      project_id: 1,
      date: moment().subtract(6, 'days').format('YYYY-MM-DD'),
      description: 'driving',
      time_leaving: '10:00:00',
      time_arriving: '11:00:00',
      odometer_start: 102150,
      odometer_end: 102295,
      total_miles: 145,
      mileage_rate: 2.50,
      amount: 362.50,
      is_approved: false,
      approved_by_id: 47,
      approved_at: moment().subtract(10, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      reason_rejected: 'foo',
      created_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }, {
      id: 3,
      team_id: 1,
      user_id: 2,
      project_id: 1,
      date: moment().subtract(10, 'days').format('YYYY-MM-DD'),
      description: 'driving',
      time_leaving: '10:00:00',
      time_arriving: '11:00:00',
      odometer_start: 102150,
      odometer_end: 102295,
      total_miles: 42,
      mileage_rate: 2.50,
      amount: 105.00,
      is_approved: null,
      approved_by_id: null,
      approved_at: null,
      reason_rejected: null,
      created_at: moment().subtract(15, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(15, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }
  ]
}
