import { UsersRepository } from '../../../../modules/accounts/repositories/UsersRepository'
import { AuthenticateController } from '../../../../modules/auth/controllers/AuthenticateController'
import { Authenticate } from '../../../../modules/auth/services/Authenticate'

export function makeAuthenticateController() {
  const usersRepository = new UsersRepository()
  const authenticate = new Authenticate(usersRepository)
  const authenticateController = new AuthenticateController(authenticate)

  return authenticateController
}
