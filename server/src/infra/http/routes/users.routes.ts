import { Router } from 'express'

import { makeListUserOrganizationsController } from '../factories/controllers/ListUserOrganizationsControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()
const listUserOrganizationsController = makeListUserOrganizationsController()

const userRouter = Router()

userRouter.get(
  '/organizations',
  (...req) =>
    ensureAuthenticatedMiddleware.handle(...req, { skipOrganization: true }),
  listUserOrganizationsController.handle.bind(listUserOrganizationsController)
)

export { userRouter }
