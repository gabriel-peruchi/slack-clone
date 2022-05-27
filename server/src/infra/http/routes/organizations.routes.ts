import { Router } from 'express'

import { makeCreateOrganizationController } from '../factories/controllers/CreateOrganizationControllerFactory'
import { makeCreateOrganizationMemberController } from '../factories/controllers/CreateOrganizationMemberControllerFactory'
import { makeListOrganizationMembersController } from '../factories/controllers/ListOrganizationMembersControllerFactory'
import { makeListOrganizationsController } from '../factories/controllers/ListOrganizationsControllerFactory'
import { makeRemoveOrganizationMemberController } from '../factories/controllers/RemoveOrganizationMemberControllerFactory'
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
const removeOrganizationMemberController =
  makeRemoveOrganizationMemberController()
const listOrganizationMembersController =
  makeListOrganizationMembersController()
const listOrganizationsController = makeListOrganizationsController()

const organizationsRouter = Router()

organizationsRouter.get(
  '/',
  (...req) =>
    ensureAuthenticatedMiddleware.handle(...req, { skipOrganization: true }),
  ensureSuperUserMiddleware.handle.bind(ensureSuperUserMiddleware),
  listOrganizationsController.handle.bind(listOrganizationsController)
)

organizationsRouter.post(
  '/',
  (...req) =>
    ensureAuthenticatedMiddleware.handle(...req, { skipOrganization: true }),
  ensureSuperUserMiddleware.handle.bind(ensureSuperUserMiddleware),
  createOrganizationController.handle.bind(createOrganizationController)
)

organizationsRouter.get(
  '/members',
  ensureAuthenticatedMiddleware.handle.bind(ensureAuthenticatedMiddleware),
  ensureOrganizationAdminMiddleware.handle.bind(
    ensureOrganizationAdminMiddleware
  ),
  listOrganizationMembersController.handle.bind(
    listOrganizationMembersController
  )
)

organizationsRouter.post(
  '/members',
  ensureAuthenticatedMiddleware.handle.bind(ensureAuthenticatedMiddleware),
  ensureOrganizationAdminMiddleware.handle.bind(
    ensureOrganizationAdminMiddleware
  ),
  createOrganizationMemberController.handle.bind(
    createOrganizationMemberController
  )
)

organizationsRouter.delete(
  '/members/:memberId',
  ensureAuthenticatedMiddleware.handle.bind(ensureAuthenticatedMiddleware),
  ensureOrganizationAdminMiddleware.handle.bind(
    ensureOrganizationAdminMiddleware
  ),
  removeOrganizationMemberController.handle.bind(
    removeOrganizationMemberController
  )
)

export { organizationsRouter }
