import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import Edit from './edit'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection {...this._getCollection()} />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/team/apps',
      columns: [
        { label: 'Title', key: 'title', primary: true, format: TitleCell }
      ],
      entity: 'app',
      modal: Edit,
      sort: { key: 'title', order: 'asc' }
    }
  }

}

var TitleCell = (props) => {
  return (
    <div className="settings">
      <div className="app-icon">
        <i className={`${props.icon} icon`} />
      </div>
      { props.title }
    </div>
  )
}

const mapPropsToPage = (props, context) => ({
  title: 'Settings'
})

export default Page(mapPropsToPage)(Index)
