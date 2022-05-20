import { UsersRepository } from '../../../../modules/accounts/repositories/UsersRepository'
import { AuthenticateController } from '../../../../modules/auth/controllers/AuthenticateController'
import { AuthenticateService } from '../../../../modules/auth/services/AuthenticateService'

export function makeAuthenticateController() {
  const userRepository = new UsersRepository()
  const authenticateService = new AuthenticateService(userRepository)
  const authenticateController = new AuthenticateController(authenticateService)

  return authenticateController
}
