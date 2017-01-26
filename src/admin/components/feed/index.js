import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

export class Feed extends React.Component {

  static propTypes = {
    loaded: React.PropTypes.number,
    records: React.PropTypes.array,
    state: React.PropTypes.string,
    status: React.PropTypes.string,
    total: React.PropTypes.number,
    onChoose: React.PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  render() {
    const { records, status, state } = this.props
    if(records.length > 0) {
      return (
        <div className="chrome-feed">
          <div className="chrome-feed-items">
            { records.map((item, index) => {
              let story = item.story.text
              if(item.subject_text) {
                story = story.replace('{subject}', `the ${item.subject_type} <span class="chrome-feed-item-subject">${item.subject_text}</span>`)
              }
              if(item.object1_text) {
                story = story.replace('{object1}', `the ${item.object1_type} <span class="chrome-feed-item-object">${item.object1_text}</span>`)
              }
              if(item.object2_text) {
                story = story.replace('{object2}', `the ${item.object2_type} <span class="chrome-feed-item-object">${item.object2_text}</span>`)
              }
              let classes = ['chrome-feed-item']
              if(item.is_read !== undefined && !item.is_read) {
                classes.push('unread')
              }
              return (
                <Link key={`item_${index}`} className={classes.join(' ')} to={{ pathname: item.url, state }} onClick={this.props.onChoose}>
                  <div className="chrome-feed-item-avatar">
                    <img src={ item.user.photo } className="ui circular image" />
                  </div>
                  <div className="chrome-feed-item-details">
                    <div className="chrome-feed-item-timestamp">{ moment(item.created_at).fromNow() } on { moment(item.created_at).format('dddd, MMMM Do @ h:mm a') }</div>
                    <div className="chrome-feed-item-story">
                      <span className="chrome-feed-item-user">{ item.user.full_name }</span>
                      <span dangerouslySetInnerHTML={{__html: story }} />
                    </div>
                    <div className="chrome-feed-item-app"><i className={`${ item.app.icon } icon`} /> { item.app.title }</div>
                  </div>
                </Link>
              )
            })}
          </div>
          { status === 'loading' &&
            <div className="chrome-infinite-loader">
              <div className="ui active inverted dimmer">
                <div className="ui small loader"></div>
              </div>
            </div>
          }
        </div>
      )
    } else if(status === 'completed' && records.length === 0) {
      return <div>nada</div>
    } else if(status === 'loading') {
      return (
        <div className="chrome-loader">
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

}

export default Feed
