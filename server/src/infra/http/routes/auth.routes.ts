import { Router } from 'express'

import { makeAuthenticateController } from '../factories/controllers/AuthenticateControllerFactory'
import { makeForgotPasswordController } from '../factories/controllers/ForgotPasswordControllerFactory'
import { makeResetPasswordController } from '../factories/controllers/ResetPasswordControllerFactory'

const authenticateController = makeAuthenticateController()
const resetPasswordController = makeResetPasswordController()
const forgotPasswordController = makeForgotPasswordController()

const authRouter = Router()

authRouter.post('/', authenticateController.handle.bind(authenticateController))

authRouter.post(
  '/forgot-password',
  forgotPasswordController.handle.bind(forgotPasswordController)
)

authRouter.post(
  '/reset-password',
  resetPasswordController.handle.bind(resetPasswordController)
)

export { authRouter }
