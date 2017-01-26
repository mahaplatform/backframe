import React from 'react'
import _ from 'lodash'
import { getActiveTeam } from 'admin/components/admin/selectors'
import Resumable from 'resumablejs'
import bytes from 'bytes'
import component from 'admin/components/component'
import * as actions from './actions'

class FileField extends React.Component {

  static propTypes = {
    files: React.PropTypes.array,
    multiple: React.PropTypes.bool,
    prompt: React.PropTypes.string,
    status: React.PropTypes.string,
    onAddFile: React.PropTypes.func,
    onUploadBegin: React.PropTypes.func,
    onUploadProgress: React.PropTypes.func,
    onUploadProcess: React.PropTypes.func,
    onUploadSuccess: React.PropTypes.func,
    onUploadFailure: React.PropTypes.func,
    onRemoveFile: React.PropTypes.func,
    onChangeFile: React.PropTypes.func
  }

  static defaultProps = {
    prompt: 'Choose File(s)',
    multiple: false
  }

  render() {
    const { files, multiple, prompt, status } = this.props
    let classes = ['filefield', status]
    return (
      <div className={classes.join(' ')}>
        { files.map((file, index) => {
          return (
            <div key={`filefield_${index}`} className="ui secondary segment">
              <p>
                { file.status === 'success' ? <a href="">{file.fileName}</a> : <strong>{file.fileName}</strong> }
                ({ bytes(file.fileSize, { decimalPlaces: 2, unitSeparator: ' ' }).toUpperCase() })
              </p>
              { file.status === 'uploading' &&
                <div className="ui small green progress" ref={`filefield_${file.uniqueIdentifier}_progress`}>
                  <div className="bar" />
                </div>
              }
              { _.includes(['added'], file.status) &&
                <div className="ui small progress" />
                }
              <div className="remove">
                <i className="x icon" onClick={ this._handleRemoveFile.bind(this, file.uniqueIdentifier) }/>
              </div>
            </div>
          )
        }) }
        { (files.length === 0 || multiple === true) &&
          <div ref="browse" className="ui browse button">
            { prompt }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { endpoint, multiple, team } = this.props
    this.resumable = new Resumable({
      target: endpoint,
      chunkSize: 1024 * 8,
      maxFiles: (multiple) ? undefined : 1,
      headers: {
        'Authorization': `Bearer ${team.token}`
      }
    })
    this.resumable.on('fileAdded', this._handleFileAdded.bind(this))
    this.resumable.on('fileProgress', this._handleUploadProgress.bind(this))
    this.resumable.on('fileSuccess', this._handleUploadSuccess.bind(this))
    this.resumable.on('error', this._handleUploadFailure.bind(this))
    this.resumable.on('complete', this._handleUploadComplete.bind(this))
    this.resumable.assignBrowse(this.refs.browse)
  }

  componentDidUpdate(prevProps) {
    const { files } = this.props
    if(files.length > prevProps.files.length) {
      this._handleUploadBegin()
    } else if(files.length <= prevProps.files.length && this.refs.browse) {
      this.resumable.assignBrowse(this.refs.browse)
    }
    files.map((file, index) => {
      if(!prevProps.files[index] || prevProps.files[index].progress < file.progress) {
        $(this.refs[`filefield_${file.uniqueIdentifier}_progress`]).progress({
          percent: file.progress
        })
      }
    })
  }

  _handleSetup() {
  }

  _handleFileAdded(file) {
    this.props.onAddFile(file.uniqueIdentifier, file.file.name, file.file.size, file.file.type, file.chunks.length)
  }

  _handleUploadBegin() {
    this.resumable.upload()
    this.props.onUploadBegin()
  }

  _handleUploadProgress(file) {
    this.props.onUploadProgress(file.file.uniqueIdentifier, file.progress())
  }

  _handleUploadFailure(file, message) {
    this.props.onUploadFailure(message)
  }

  _handleUploadSuccess(file) {
    this.props.onUploadSuccess(file.file.uniqueIdentifier)
  }

  _handleRemoveFile(uniqueIdentifier) {
    const file = this.resumable.getFromUniqueIdentifier(uniqueIdentifier)
    this.resumable.removeFile(file)
    this.props.onRemoveFile(uniqueIdentifier)
  }

  _handleUploadComplete() {
    this.props.onUploadComplete()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.filefield[props.cid].files,
  status: state.filefield[props.cid].status,
  team: getActiveTeam(state)
})

const mapDispatchToProps = {
  onAddFile: actions.addFile,
  onUploadBegin: actions.uploadBegin,
  onUploadProgress: actions.uploadProgress,
  onUploadProcess: actions.uploadProcess,
  onUploadFailure: actions.uploadFailure,
  onUploadSuccess: actions.uploadSuccess,
  onRemoveFile: actions.removeFile,
  onUploadComplete: actions.uploadComplete
}

export default component(mapStateToProps, mapDispatchToProps, FileField, 'filefield', true)
