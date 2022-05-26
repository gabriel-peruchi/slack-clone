import { Router } from 'express'

import { makeListUserOrganizationsController } from '../factories/controllers/ListUserOrganizationsControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()
const listUserOrganizationsController = makeListUserOrganizationsController()

const userRouter = Router()

userRouter.use(
  ensureAuthenticatedMiddleware.handle.bind(ensureAuthenticatedMiddleware)
)

userRouter.get(
  '/organizations',
  listUserOrganizationsController.handle.bind(listUserOrganizationsController)
)

export { userRouter }
