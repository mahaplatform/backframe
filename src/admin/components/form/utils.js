import _ from 'lodash'

export const mapFields = (sections, callback) => {
  _.map(sections, section => {
    _.map(section.fields, field => {
      if(field.type === 'fields') {
        _.map(field.fields, subfield => {
          callback(subfield)
        })
      } else {
        callback(field)
      }
    })
  })
}

export const collectData = (sections, data) => {
  let entity = {}
  mapFields(sections, (field) => {
    if(field.include !== false) {
      entity[field.name] = data[field.name]
    }
  })
  return entity
}

export const getDefaults = sections => {
  let defaults = {}
  mapFields(sections, (field) => {
    if(field.include !== false) {
      defaults[field.name] = field.defaultValue
    }
  })
  return defaults
}

export const validateForm = (sections, data) => {
  const message = 'There were problems with your data.'
  let errors = {}
  mapFields(sections, (field) => {
    let value = data[field.name]
    if(field.required && _.isEmpty(value)) {
      errors[field.name] = ['field is required']
    }
  })
  return errors ? { message, errors } : null
}
