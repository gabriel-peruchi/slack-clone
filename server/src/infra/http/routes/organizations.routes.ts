import { Router } from 'express'

import { makeCreateOrganizationController } from '../factories/controllers/CreateOrganizationControllerFactory'
import { makeCreateOrganizationMemberController } from '../factories/controllers/CreateOrganizationMemberControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import { makeEnsureOrganizationAdminMiddleware } from '../factories/middlewares/EnsureOrganizationAdminMiddlewareFactory'
import { makeEnsureSuperUserMiddleware } from '../factories/middlewares/EnsureSuperUserMiddlewareFactory'

const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()
const ensureSuperUserMiddleware = makeEnsureSuperUserMiddleware()
const ensureOrganizationAdminMiddleware =
  makeEnsureOrganizationAdminMiddleware()
const createOrganizationController = makeCreateOrganizationController()
const createOrganizationMemberController =
  makeCreateOrganizationMemberController()

const organizationsRouter = Router()

organizationsRouter.use(
  ensureAuthenticatedMiddleware.handle.bind(ensureAuthenticatedMiddleware)
)

organizationsRouter.post(
  '/',
  ensureSuperUserMiddleware.handle.bind(ensureSuperUserMiddleware),
  createOrganizationController.handle.bind(createOrganizationController)
)

organizationsRouter.post(
  '/:organizationId/members',
  ensureOrganizationAdminMiddleware.handle.bind(
    ensureOrganizationAdminMiddleware
  ),
  createOrganizationMemberController.handle.bind(
    createOrganizationMemberController
  )
)

export { organizationsRouter }
