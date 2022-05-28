import { UsersRepository } from '../../../../modules/accounts/repositories/UsersRepository'
import { ResetPasswordController } from '../../../../modules/auth/controllers/ResetPasswordController'
import { ResetPassword } from '../../../../modules/auth/services/ResetPassword'

export function makeResetPasswordController() {
  const usersRepository = new UsersRepository()
  const resetPassword = new ResetPassword(usersRepository)
  const resetPasswordController = new ResetPasswordController(resetPassword)

  return resetPasswordController
}
