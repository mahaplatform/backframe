import React from 'react'
import { Link } from 'react-router'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection { ...this._getCollection() } />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/team/apps',
      filters: [
        { label: 'Author', name: 'app_author_id', type: 'select', multiple: true, endpoint: '/admin/team/apps/authors', value: 'id', text: 'name' },
        { label: 'Category', name: 'app_category_id', type: 'select', multiple: true, endpoint: '/admin/team/apps/categories', value: 'id', text: 'title' }
      ],
      sort: { key: 'created_at', order: 'desc' },
      layout: Apps,
      entity: 'app'
    }
  }

}

class Apps extends React.Component {

  static propTypes = {
    records: React.PropTypes.array,
    status: React.PropTypes.string
  }

  render() {
    const { records } = this.props
    return (
      <div className="chrome-body">
        <div className="apps">
          { records.map((app, index) => {
            return (
              <div key={`app_${index}`} className={`app ${app.installed && 'installed'}`}>
                <div className="app-content">
                  <h2>{ app.title }</h2>
                  <h4>by <Link to={{ pathname: `/admin/team/apps/authors/${app.author.id}`, state: 'next' }}>{ app.author.name }</Link></h4>
                  <p>{ app.short_description }</p>
                  <Link to={{ pathname: `/admin/team/apps/${app.id}`, state: 'next' }} className="ui small fluid button">More <i className="right chevron icon" /></Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Apps',
  rights: ['team.manage_apps']
})

export default Page(mapPropsToPage)(Index)
