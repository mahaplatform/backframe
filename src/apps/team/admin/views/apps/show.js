import React from 'react'
import { Link } from 'react-router'
import Page from 'admin/components/page'

class Show extends React.Component {

  render() {
    const { app } = this.props
    return (
      <div className="chrome-body">
        <div className="app-detail">
          <div className={`app${app.installed ? ' installed' : ''}`}>
            <div className="app-icon">
              <i className={`${app.icon} icon`} />
            </div>
            <div className="app-content">
              <h2>{ app.title }</h2>
              <h4>by <Link to={{ pathname: `/admin/team/apps/authors/${app.author.id}`, state: 'next' }}>{ app.author.name }</Link></h4>
              <p>{ app.long_description }</p>
              { app.installed && <button className="ui fluid button"><i className="remove icon" /> Uninstall</button> }
              { !app.installed && <button className="ui fluid button"><i className="check icon" /> Install</button> }
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => {

  return {
    title: 'App',
    resources: {
      app: `/admin/team/apps/${props.params.id}`
    }
  }
}

export default Page(mapPropsToPage)(Show)
