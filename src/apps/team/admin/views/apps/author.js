import React from 'react'
import Page from 'admin/components/page'

class Author extends React.Component {

  render() {
    const { author } = this.props
    return (
      <div className="chrome-body">
        <div className="author">
          <div className="author-details">
            <h2>{ author.name }</h2>
          </div>
        </div>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => {

  return {
    title: 'Author',
    rights: ['team.manage_apps'],
    resources: {
      author: `/admin/team/apps/authors/${props.params.id}`
    }
  }
}

export default Page(mapPropsToPage)(Author)
