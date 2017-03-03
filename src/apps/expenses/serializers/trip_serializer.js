export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    project: {
      id: object.related('project').get('id'),
      title: object.related('project').get('title')
    },
    user: {
      id: object.related('user').get('id'),
      full_name: object.related('user').get('full_name')
    },
    date: object.get('date'),
    description: object.get('description'),
    time_leaving: object.get('time_leaving'),
    time_arriving: object.get('time_arriving'),
    odometer_start: object.get('odometer_start'),
    odometer_end: object.get('odometer_end'),
    total_miles: object.get('total_miles'),
    mileage_rate: object.get('mileage_rate'),
    amount: object.get('amount'),
    approved_by: object.related('approved_by').get('id') ? {
      id: object.related('approved_by').get('id'),
      full_name: object.related('approved_by').get('full_name')
    } : null,
    approved_at: object.get('approved_at'),
    is_approved: object.get('is_approved'),
    reason_rejected: object.get('reason_rejected'),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
