import App from 'platform/models/app'

export default (title) => {

  return (req, res, next) => {

    App.where({ title }).fetch().then(app => {

      req.app = app

      next()

    }).catch(next)

  }

}
