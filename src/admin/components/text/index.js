import React from 'react'
import _ from 'lodash'
import Format from 'admin/utils/format'

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
    const { format } = this.props
    return (
      <div className="text">
        <Format format={format} value={this.state.value} />
      </div>
    )
  }

}

export default Text
