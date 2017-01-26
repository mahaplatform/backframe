import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getActiveTeam, getActiveUser } from '../admin/selectors'
import Helmet from 'react-helmet'
import _ from 'lodash'

export default (pageProps) => {

  return (BodyComponent) => {

    class Page extends React.Component {

      static contextTypes = {
        container: React.PropTypes.object,
        drawer: React.PropTypes.object,
        flash: React.PropTypes.object,
        history: React.PropTypes.object,
        modal: React.PropTypes.object,
        session: React.PropTypes.object,
        tasks: React.PropTypes.object
      }

      static propTypes = {
        data: React.PropTypes.object,
        history: React.PropTypes.array,
        status: React.PropTypes.string,
        team: React.PropTypes.object,
        user: React.PropTypes.object
      }

      page() {
        if(this.pageProps) return this.pageProps
        this.pageProps = pageProps(this.props, this.context)
        return this.pageProps
      }

      render() {
        const { rights, resources, task, tasks, title } = this.page()
        const { data, history, status, team, user } = this.props
        const loaded = !resources || _.isEqual(Object.keys(data).sort(), Object.keys(resources).sort())
        const access = !rights || this._userHasRight(user, rights)
        return (
          <div className="chrome-page">
            <Helmet title={`${team.title} | ${title}`} />
            <div className="chrome-header">
              { history.length > 1 ?
                <div className="chrome-back" onClick={this._handleBack.bind(this)}>
                  <i className="left chevron icon" />
                </div> : <div className="chrome-back" />
              }
              <div className="chrome-title">
                { access ? title : 'Access Denied' }
              </div>
              <div className="chrome-more">
                { access && tasks &&
                  <div className="chrome-tasks">
                    <a onClick={ this._handleOpenTasks.bind(this) }>
                      <i className="ellipsis vertical icon" />
                    </a>
                  </div>
                }
                { access && task &&
                  <div className="chrome-task">
                    <a onClick={this._handleOpenTask.bind(this)}>
                      <i className={`${task.icon} icon`} />
                    </a>
                  </div>
                }
              </div>
            </div>
            { resources && status === 'loading' &&
              <div className="chrome-loader">
                <div className="ui active inverted dimmer">
                  <div className="ui large text loader">Loading</div>
                </div>
              </div>
            }
            { resources && status === 'failure' &&
              <div className="chrome-error">
                <div className="chrome-error-message">
                  <i className="warning sign icon" />
                  <h2>Unable to load<br /> this page</h2>
                  <Link className="ui basic red button" onClick={this._refreshResources.bind(this)}>Try again</Link>
                </div>
              </div>
            }
            { !access &&
              <div className="chrome-error">
                <div className="chrome-error-message">
                  <i className="warning sign icon" />
                  <h2>You do not have permission to access this content</h2>
                </div>
              </div>
            }
            { access && loaded && <BodyComponent {...this.props} {...data} /> }
          </div>
        )
      }

      componentDidMount() {
        const { resources } = this.page()
        if(resources) {
          this.context.container.fetch(resources)
        }
      }

      componentWillUnmount() {
        const { resources } = this.page()
        if(resources) {
          const keys = Object.keys(resources)
          this.context.container.clear(keys)
        }
      }

      _refreshResources() {
        const { resources } = this.page()
        if(resources) {
          const props = Object.keys(resources)
          this.context.container.refresh(props)
        }
      }

      _userHasRight(user, rights) {
        return rights.reduce((permit, right) => {
          return (!_.includes(user.rights, right)) ? false : permit
        }, true)
      }

      _handleBack() {
        this.context.history.goBack()
      }

      _handleOpenTasks() {
        const { tasks } = this.page()
        this.context.tasks.open(tasks)
      }

      _handleOpenTask() {
        const { task } = this.page()
        if(task.route) {
          this.context.history.push(task.route)
        } else if(task.modal) {
          this.context.modal.push(task.modal)
        } else if(task.drawer){
          const location = task.location || 'right'
          this.context.drawer.open(task.drawer, location)
        } else if(task.handler){
          task.handler()
        }
      }

    }

    const mapStateToProps = state => ({
      history: state.history,
      team: getActiveTeam(state),
      user: getActiveUser(state),
      ...state.container
    })

    return connect(mapStateToProps)(Page)

  }

}
