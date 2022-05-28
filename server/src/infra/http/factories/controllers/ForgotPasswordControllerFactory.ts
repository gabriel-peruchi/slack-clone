import { UsersRepository } from '../../../../modules/accounts/repositories/UsersRepository'
import { ForgotPassword } from '../../../../modules/auth/services/ForgotPassword'
import { MailProvider } from '../../../providers/MailProvider'
import { ForgotPasswordController } from './../../../../modules/auth/controllers/ForgotPasswordController'

export function makeForgotPasswordController() {
  const usersRepository = new UsersRepository()
  const mailProvider = new MailProvider()
  const forgotPassword = new ForgotPassword(usersRepository, mailProvider)
  const forgotPasswordController = new ForgotPasswordController(forgotPassword)

  return forgotPasswordController
}
