import React from 'react'
import Page from 'admin/components/page'

class Reports extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div>Reports</div>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Reports'
})

export default Page(mapPropsToPage)(Reports)
