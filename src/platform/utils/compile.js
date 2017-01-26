const path = require('path')
const glob = require('glob')
const fs = require('fs')
const _ = require('lodash')

module.exports = function compileApps() {
  const configs = glob.sync('src/**/app.json')
  const apps = configs.map(config => {
    const contents = require(path.resolve(config))
    return Object.assign(contents, {
      name: contents.title.toLowerCase(),
      filepath: path.join.apply(path, config.split(path.sep).slice(0, -1).slice(1)),
      path: config.split(path.sep).slice(-2, -1)[0]
    })
  })
  const files = [
    './src/admin/reducer.js',
    './src/admin/style.less',
    './src/admin/client.js'
  ]
  files.map(file => {
    const template = _.template(fs.readFileSync(`${file}.template`), { imports: { fs } })
    fs.writeFileSync(file, template({ apps }))
  })
}
