import 'express-async-errors'

import cors from 'cors'
import express from 'express'
import http from 'http'
import path from 'path'

import { ErrorMiddleware } from './middlewares/ErrorMiddleware'
import { router } from './routes'

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.static(path.join(__dirname, '..', '..', '..', 'public')))
app.use(cors())
app.use(router)
app.use(new ErrorMiddleware().handle)

const serverHttp = http.createServer(app)

export { serverHttp }
