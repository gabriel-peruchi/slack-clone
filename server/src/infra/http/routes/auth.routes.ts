import { Router } from 'express'

import { makeAuthenticateController } from '../factories/controllers/AuthenticateControllerFactory'

const authenticateController = makeAuthenticateController()

const authRouter = Router()

authRouter.post('/', authenticateController.handle.bind(authenticateController))

export { authRouter }
