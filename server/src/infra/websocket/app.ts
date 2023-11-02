import { Server } from 'socket.io'

import { serverHttp } from '../http/app'
import { makeEnsureAuthenticatedMiddleware } from './factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()

const socketIo = new Server(serverHttp, {
  cors: {
    origin: process.env.CLIENT_URL
  }
})

const workspaces = socketIo.of(/^\/\w+$/)

workspaces
  .use(ensureAuthenticatedMiddleware.handle.bind(ensureAuthenticatedMiddleware))
  .on('connection', (socket) => {
    const { userId, organizationId } = socket.request as any
    console.log(userId, organizationId)

    socket.on('disconnect', (socket) => {
      console.log('Desconectado')
    })
  })

export { socketIo }
