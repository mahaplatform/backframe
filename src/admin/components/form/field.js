import React from 'react'
import Fields from './fields'
import Control from 'admin/components/control'

class Field extends React.Component {

  static propTypes = {
    columns: React.PropTypes.array,
    data: React.PropTypes.object,
    endpoint: React.PropTypes.string,
    errors: React.PropTypes.object,
    fields: React.PropTypes.array,
    include: React.PropTypes.bool,
    instructions: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.array,
    required: React.PropTypes.bool,
    type: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]).isRequired,
    show: React.PropTypes.bool,
    onUpdateData: React.PropTypes.func
  }

  static defaultProps = {
    columns: [],
    data: {},
    errors: {},
    fields: [],
    include: true,
    options: [],
    required: false,
    show: true,
    onUpdateData: () => {}
  }

  render() {
    const { columns, data, endpoint, errors, fields, include, instructions, prompt } = this.props
    const { label, name, options, required, type, text, show, value, onUpdateData } = this.props
    const { prefix, suffix, disabled } = this.props
    const error = (errors && errors[name]) ? errors[name][0] : null
    const defaultValue = data[name]
    let classes = ['field']
    if(error) {
      classes.push('error')
    }
    if(required) {
      classes.push('required')
    }
    if(!include || !show) {
      return null
    }
    return (
      <div className={classes.join(' ')}>
        {(label) ? <label>{label}</label> : null}
        {(instructions) ? <div className="instructions">{instructions}</div> : null}
        { type === 'fields' ?
          <Fields fields={fields}
                  onChange={this._handleUpdateData.bind(this)}
                  onUpdateData={onUpdateData} /> :
          <Control type={type}
                   label={label}
                   prompt={prompt}
                   prefix={prefix}
                   suffix={suffix}
                   disabled={disabled}
                   endpoint={endpoint}
                   value={value}
                   text={text}
                   columns={columns}
                   options={options}
                   defaultValue={defaultValue}
                   onChange={this._handleUpdateData.bind(this)} />
        }
        { error &&
          <div className="ui pointing red label">
            {error}
          </div>
        }
      </div>
    )
  }

  _handleUpdateData(value) {
    this.props.onUpdateData(this.props.name, value)
  }

}

export default Field
