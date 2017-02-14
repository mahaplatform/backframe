import React from 'react'
import _ from 'lodash'
import component from 'admin/components/component'
import { getDefaults, collectData } from './utils'
import * as actions from './actions'
import Section from './section'

class Form extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object
  }

  static propTypes = {
    cid: React.PropTypes.string,
    action: React.PropTypes.string,
    data: React.PropTypes.object,
    errors: React.PropTypes.object,
    method: React.PropTypes.string,
    fields: React.PropTypes.array,
    redirect: React.PropTypes.string,
    status: React.PropTypes.string,
    title: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onChangeField: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onFailure: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    onValidateForm: React.PropTypes.func,
    onResetForm: React.PropTypes.func,
    onUpdateData: React.PropTypes.func
  }

  static defaultProps = {
    method: 'GET',
    onChange: () => {},
    onChangeField: () => {},
    onSubmit: () => {},
    onFailure: (error) => {},
    onSuccess: (entity) => {}
  }

  render() {
    const { title, instructions, status, sections, data, errors } = this.props
    let formClasses = ['ui', 'form', status]
    if(_.includes(['pending', 'submitting'], status)) {
      formClasses.push('loading')
    }
    return (
      <div className="chrome-modal-panel">
        <div className="chrome-modal-panel-header">
          <div className="chrome-modal-panel-header-cancel" onClick={ this._handleCancel.bind(this) }>
            Cancel
          </div>
          <div className="chrome-modal-panel-header-title">
            { title }
          </div>
          <div className="chrome-modal-panel-header-proceed" onClick={ this._handleSubmit.bind(this) }>
            Save
          </div>
        </div>
        <div className="chrome-modal-panel-body">
          <div className="form">
            { status !== 'loading' ?
              <div className={formClasses.join(' ')} ref="form">
                { instructions &&
                  <div className="instructions">{instructions}</div>
                }
                { sections.map((section, index) => {
                  return <Section {...section}
                                  data={data}
                                  errors={errors}
                                  key={`section_${index}`}
                                  onUpdateData={this._handleUpdateData.bind(this)} />
                })}
              </div> :
              <div className="ui active centered inline loader" />
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { sections, onSetSections } = this.props
    onSetSections(sections)
  }

  componentDidUpdate(prevProps) {
    const { data, entity, status } = this.props
    if(prevProps.status !== status) {
      if(status === 'configured') {
        this._handleLoadData()
      } else if(status === 'validated') {
        this._handleSubmit()
      } else if(status === 'success') {
        this._handleSuccess(entity)
      } else if(status === 'failure') {
        this._handleFailure()
      }
    } else if(prevProps.data != data) {
      this._handleChange(prevProps.data, data)
    }
  }

  _handleLoadData() {
    const { cid, endpoint, sections, onFetchData, onSetData } = this.props
    if(endpoint) {
      onFetchData(cid, endpoint)
    } else {
      const data = getDefaults(sections)
      onSetData(data)
    }
  }

  _handleUpdateData(key, value) {
    const { onUpdateData } = this.props
    onUpdateData(key, value)
  }

  _handleChange(previous, current) {
    const { onChangeField, onChange } = this.props
    if(onChangeField) {
      _.forOwn(current, (value, code) => {
        if(previous[code] != current[code]) {
          onChangeField(code, value)
        }
      })
    }
    if(onChange) {
      onChange(current)
    }
  }

  _handleSubmit() {
    const { action, cid, data, method, sections, onSubmit, onSubmitForm } = this.props
    let filtered = collectData(sections, data)
    if(action) {
      onSubmitForm(cid, method, action, filtered)
    } else if(onSubmit) {
      if(onSubmit(filtered)) {
        this._handleSuccess()
      } else {
        this._handleFailure()
      }
    } else {
      this._handleSuccess()
    }
  }

  _handleSuccess(entity) {
    const message = 'Your form was successfully saved!'
    this.context.flash.set('success', message)
    this.props.onSuccess(entity)
  }

  _handleFailure() {
    const message = 'There were problems with your data'
    this.context.flash.set('error', message)
    this.props.onFailure()
  }

  _handleCancel() {
    this.props.onCancel()
  }

}

const mapStateToProps = (state, props) => {
  return {
    data: state.form[props.cid].data,
    entity: state.form[props.cid].entity,
    errors: state.form[props.cid].errors,
    status: state.form[props.cid].status
  }
}

const mapDispatchToProps = {
  onSetSections: actions.setSections,
  onFetchData: actions.fetchData,
  onSetData: actions.setData,
  onSubmitForm: actions.submitForm,
  onUpdateData: actions.updateData
}

export default component(mapStateToProps, mapDispatchToProps, Form, 'form', true)
