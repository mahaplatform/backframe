import express from 'express'
import { worker } from 'app/services/backframe'

worker({ queues: []})
