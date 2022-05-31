import { GetProfileController } from '../../../../modules/accounts/controllers/GetProfileController'
import { UsersRepository } from '../../../../modules/accounts/repositories/UsersRepository'
import { GetProfile } from '../../../../modules/accounts/services/GetProfile'

export function makeGetProfileController() {
  const usersRepository = new UsersRepository()
  const getProfile = new GetProfile(usersRepository)
  const getProfileController = new GetProfileController(getProfile)

  return getProfileController
}
