import React from 'react'

class Panel extends React.Component {

  render() {
    const { children } = this.props
    return (
      <div className="chrome-panel">
        { children }
      </div>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

}

export default Panel
