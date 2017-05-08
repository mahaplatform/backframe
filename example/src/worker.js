import environment from './services/environment'
import express from 'express'
import backframe from './services/backframe'
import queues from './app/queues'

export default backframe.worker({ queues })
