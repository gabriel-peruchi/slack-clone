import { Router } from 'express'

import { makeCreateOrganizationController } from '../factories/controllers/CreateOrganizationControllerFactory'
import { makeCreateOrganizationMemberController } from '../factories/controllers/CreateOrganizationMemberControllerFactory'
import { makeListOrganizationMembersController } from '../factories/controllers/ListOrganizationMembersControllerFactory'
import { makeListOrganizationsController } from '../factories/controllers/ListOrganizationsControllerFactory'
import { makeRemoveOrganizationMemberController } from '../factories/controllers/RemoveOrganizationMemberControllerFactory'
import { makeUpdateOrganizationStatusController } from '../factories/controllers/UpdateOrganizationStatusControllerFactory'
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
const updateOrganizationStatusController =
  makeUpdateOrganizationStatusController()

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

organizationsRouter.patch(
  '/:organizationId/status',
  (...req) =>
    ensureAuthenticatedMiddleware.handle(...req, { skipOrganization: true }),
  ensureSuperUserMiddleware.handle.bind(ensureSuperUserMiddleware),
  updateOrganizationStatusController.handle.bind(
    updateOrganizationStatusController
  )
)

organizationsRouter.get(
  '/members',
  (...req) => ensureAuthenticatedMiddleware.handle(...req),
  ensureOrganizationAdminMiddleware.handle.bind(
    ensureOrganizationAdminMiddleware
  ),
  listOrganizationMembersController.handle.bind(
    listOrganizationMembersController
  )
)

organizationsRouter.post(
  '/members',
  (...req) => ensureAuthenticatedMiddleware.handle(...req),
  ensureOrganizationAdminMiddleware.handle.bind(
    ensureOrganizationAdminMiddleware
  ),
  createOrganizationMemberController.handle.bind(
    createOrganizationMemberController
  )
)

organizationsRouter.delete(
  '/members/:memberId',
  (...req) => ensureAuthenticatedMiddleware.handle(...req),
  ensureOrganizationAdminMiddleware.handle.bind(
    ensureOrganizationAdminMiddleware
  ),
  removeOrganizationMemberController.handle.bind(
    removeOrganizationMemberController
  )
)

export { organizationsRouter }
