import { Router } from 'express'

import { makeListUserOrganizationsController } from '../factories/controllers/ListUserOrganizationsControllerFactory'
import { makeUpdateProfileController } from '../factories/controllers/UpdateProfileControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const updateProfileController = makeUpdateProfileController()
const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()
const listUserOrganizationsController = makeListUserOrganizationsController()

const userRouter = Router()

userRouter.put(
  '/profile',
  (...req) =>
    ensureAuthenticatedMiddleware.handle(...req, { skipOrganization: true }),
  updateProfileController.handle.bind(updateProfileController)
)

userRouter.get(
  '/organizations',
  (...req) =>
    ensureAuthenticatedMiddleware.handle(...req, { skipOrganization: true }),
  listUserOrganizationsController.handle.bind(listUserOrganizationsController)
)

export { userRouter }
