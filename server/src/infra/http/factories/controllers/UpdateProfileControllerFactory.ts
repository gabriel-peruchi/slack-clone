import { UpdateProfileController } from '../../../../modules/accounts/controllers/UpdateProfileController'
import { UsersRepository } from '../../../../modules/accounts/repositories/UsersRepository'
import { UpdateProfile } from '../../../../modules/accounts/services/UpdateProfile'
import { FilesRepository } from '../../../../modules/files/repositories/FilesRepository'

export function makeUpdateProfileController() {
  const filesRepository = new FilesRepository()
  const usersRepository = new UsersRepository()
  const updateProfile = new UpdateProfile(usersRepository, filesRepository)
  const updateProfileController = new UpdateProfileController(updateProfile)

  return updateProfileController
}
