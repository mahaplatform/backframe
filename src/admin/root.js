import React from 'react'
import { Provider } from 'react-redux'
import CreateStore from 'platform/utils/create_store'
import reducer from './reducer'

class Root extends React.Component {

  render() {
    const store = CreateStore(reducer)
    const { children } = this.props
    return (
      <Provider store={ store }>
        { children }
      </Provider>
    )
  }

}

export default Root
