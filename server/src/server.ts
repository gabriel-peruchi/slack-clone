import 'express-async-errors'

import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import http from 'http'

config()

import './infra/mongoose/connection' // eslint-disable-line
import { router } from './infra/http/routes' // eslint-disable-line

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())
app.use(router)

const serverHttp = http.createServer(app)

export { serverHttp }
