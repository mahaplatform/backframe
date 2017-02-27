export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    project: {
      id: object.related('project').get('id'),
      title: object.related('project').get('title')
    },
    user: {
      full_name: object.related('user').get('full_name'),
      initials: object.related('user').get('initials'),
      photo: object.related('user').related('photo').get('url'),
      email: object.related('user').get('email')
    },
    date: object.get('date'),
    description: object.get('description'),
    time_leaving: object.get('time_leaving'),
    time_arriving: object.get('time_arriving'),
    odometer_start: object.get('odometer_start'),
    odometer_end: object.get('odometer_end'),
    total_miles: object.get('total_miles')
  })

}
