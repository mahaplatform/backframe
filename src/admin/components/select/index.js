import React from 'react'
import _ from 'lodash'

class Select extends React.Component {

  static propTypes = {
    prompt: React.PropTypes.string,
    options: React.PropTypes.array,
    disabled: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    status: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    prompt: '',
    options: [],
    disabled: false,
    placeholder: '',
    status: 'ready',
    defaultValue: null,
    onChange: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue
    }
  }

  render() {
    const { prompt, options, disabled, status } = this.props
    let classes = ['ui','fluid','search','selection','dropdown']
    if(disabled) {
      classes.push('disabled')
    }
    if(status == 'loading') {
      classes.push('loading')
    } else if(status == 'error') {
      classes.push('error')
    }
    const chosen = _.find(options, { key: this.state.value })
    return (
      <div className="select">
        <div className={classes.join(' ')} ref="control">
          { chosen ? <div className="text">{chosen.value}</div> : <div className="default text">{prompt}</div> }
          <i className="dropdown icon" />
          <div className="menu">
            { options.map((option, index) => {
              return <div key={`option_${index}`} className={(option.key == this.state.value) ? 'item active selected' : 'item'} data-value={option.key}>{option.value}</div>
            })}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    $(this.refs.control).dropdown({
      onChange: this.handleChange.bind(this)
    })
  }

  componentDidUpdate(prevProps) {
    $(this.refs.control).dropdown('refresh')
    if(prevProps.defaultValue != this.props.defaultValue) {
      this.setValue(this.props.defaultValue)
    }
  }

  handleChange(value) {
    this.setValue(value)
    this.props.onChange(value)
  }

  setValue(value) {
    this.setState({ value })
  }

}

export default Select
