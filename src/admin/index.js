import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import admin from './client'
import './style.less'

ReactDOM.render(<Router routes={admin} history={browserHistory} />, document.getElementById('platform'))
