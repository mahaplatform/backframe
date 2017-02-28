import React from 'react'

export default (props) => {
  const { access } = props
  return (
    <div className="list role-access">
      { access.map((app, appindex) => {
        return (
          <div key={`app_${appindex}`} className="role-access-app">
            <div className="role-access-title">
              { app.title }
            </div>
            { app.rights.length > 0 && app.rights.map((right, rightindex) => {
              return (
                <div key={`right_${appindex}_${rightindex}`} className="role-access-right">
                  <div className="role-access-right-icon">
                    { right.assigned ? <i className="green check icon" /> : <i className="red remove icon" /> }
                  </div>
                  <div className="role-access-right-label">
                    <strong>{ right.text }</strong><br />
                    { right.description }
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
