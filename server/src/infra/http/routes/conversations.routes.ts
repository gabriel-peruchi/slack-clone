import { Router } from 'express'

import { makeCreateConversationController } from '../factories/controllers/CreateConversationControllerFactory'
import { makeGetConversationsController } from '../factories/controllers/GetConversationsControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import { makeEnsureOrganizationAdminMiddleware } from '../factories/middlewares/EnsureOrganizationAdminMiddlewareFactory'

const getConversationsController = makeGetConversationsController()
const createConversationController = makeCreateConversationController()
const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()
const ensureOrganizationAdminMiddleware =
  makeEnsureOrganizationAdminMiddleware()

const conversationRouter = Router()

conversationRouter.post(
  '/',
  (...req) => ensureAuthenticatedMiddleware.handle(...req),
  (...req) => ensureOrganizationAdminMiddleware.handle(...req),
  createConversationController.handle.bind(createConversationController)
)

conversationRouter.get(
  '/',
  (...req) => ensureAuthenticatedMiddleware.handle(...req),
  getConversationsController.handle.bind(getConversationsController)
)

export { conversationRouter }
