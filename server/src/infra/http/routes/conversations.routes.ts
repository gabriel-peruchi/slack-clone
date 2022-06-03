import { Router } from 'express'

import { makeCreateConversationController } from '../factories/controllers/CreateConversationControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import { makeEnsureOrganizationAdminMiddleware } from '../factories/middlewares/EnsureOrganizationAdminMiddlewareFactory'

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

export { conversationRouter }
