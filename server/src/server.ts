import 'express-async-errors'

import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import http from 'http'

config()

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())

const serverHttp = http.createServer(app)

export { serverHttp }
