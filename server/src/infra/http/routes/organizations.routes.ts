import { Router } from 'express'

import { makeCreateOrganizationController } from '../factories/controllers/CreateOrganizationControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import { makeEnsureSuperUserMiddleware } from '../factories/middlewares/EnsureSuperUserMiddlewareFactory'

const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()
const ensureSuperUserMiddleware = makeEnsureSuperUserMiddleware()
const createOrganizationController = makeCreateOrganizationController()

const organizationsRouter = Router()

organizationsRouter.use(
  ensureAuthenticatedMiddleware.handle.bind(ensureAuthenticatedMiddleware),
  ensureSuperUserMiddleware.handle.bind(ensureSuperUserMiddleware)
)

organizationsRouter.post(
  '/',
  createOrganizationController.handle.bind(createOrganizationController)
)

export { organizationsRouter }
