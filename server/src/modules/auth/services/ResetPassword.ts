import { AppError } from '../../../core/errors/AppError'
import { dateUTCNow } from '../../../core/utils/date'
import { equalsOrError, existsOrError } from '../../../core/utils/validations'
import { encryptPassword, User } from '../../accounts/domain/User'
import { UsersRepository } from '../../accounts/repositories/UsersRepository'

type ResetPasswordRequest = {
  token: string
  password: string
  passwordConfirmation: string
}

export class ResetPassword {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    token,
    password,
    passwordConfirmation
  }: ResetPasswordRequest) {
    existsOrError(token, 'Token não informado.')
    existsOrError(password, 'Senha não informada.')
    equalsOrError(password, passwordConfirmation, 'Senhas não conferem.')

    const userExists = await this.usersRepository.findByTokenResetPassword(
      token
    )
    existsOrError(userExists, 'Token inválido.')

    const user = userExists as User
    const resetPasswordExpires = user.resetPasswordExpires as Date
    const dateNow = dateUTCNow()

    if (resetPasswordExpires < dateNow) {
      throw new AppError('Token inválido.')
    }

    const passwordHash = await encryptPassword(password)

    await this.usersRepository.updateById(user.id, {
      password: passwordHash,
      resetPasswordToken: null,
      resetPasswordExpires: null
    })
  }
}
