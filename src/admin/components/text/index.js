import React from 'react'
import _ from 'lodash'

class Text extends React.Component {

  static propTypes = {
    defaultValue: React.PropTypes.string
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.state = {
      value: _.toString(props.defaultValue)
    }
  }

  render() {
    return (
      <div className="text">
        {this.state.value}
      </div>
    )
  }

}

export default Text
