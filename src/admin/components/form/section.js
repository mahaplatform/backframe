import React from 'react'
import Field from './field.js'

class Section extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    instructions: React.PropTypes.string,
    collapsing: React.PropTypes.bool,
    collapsed: React.PropTypes.bool,
    fields: React.PropTypes.array,
    data: React.PropTypes.object,
    errors: React.PropTypes.object,
    onUpdateData: React.PropTypes.func
  }

  static defaultProps = {
    collapsing: false
  }

  constructor(props) {
    super(props)
    this.state = {
      collapsed: (props.collapsed !== null) ? props.collapsed : props.collapsing
    }
  }

  render() {
    const { collapsing, label, instructions, fields, data, errors, onUpdateData } = this.props
    const { collapsed } = this.state
    let classes = ['ui', 'basic', 'segment']
    if(collapsing) {
      classes.push('collapsing')
      classes.push(collapsed ? 'collapsed' : 'expanded')
    }
    return (
      <div className={classes.join(' ')}>
        { label &&
          <h4 className="ui header" onClick={ this.toggle.bind(this)} >
            { label }
            { collapsed ? <i className="plus icon" /> : <i className="minus icon" /> }
          </h4>
        }
        <div className="section">
          { instructions &&
            <div className="instructions">
              { instructions }
            </div>
          }
          { fields.map((field, index) => {
            return <Field {...field}
                          data={data}
                          errors={errors}
                          key={`field_${index}`}
                          onUpdateData={onUpdateData} />
          })}
        </div>
      </div>
    )
  }

  toggle() {
    this.setState({collapsed: !this.state.collapsed})
  }

}

export default Section
