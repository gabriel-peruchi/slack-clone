import { randomBytes } from 'crypto'

import { existsOrError } from '../../../core/utils/validations'
import { MailProvider } from '../../../infra/providers/MailProvider'
import { User } from '../../accounts/domain/User'
import { UsersRepository } from '../../accounts/repositories/UsersRepository'

type ForgotPasswordRequest = {
  email: string
}

export class ForgotPassword {
  constructor(
    private usersRepository: UsersRepository,
    private emailProvider: MailProvider
  ) {}

  async execute({ email }: ForgotPasswordRequest) {
    existsOrError(email, 'Email não informado.')

    const userExists = await this.usersRepository.findByEmail(email)
    existsOrError(userExists, 'Usuário não existe.')

    const user = userExists as User

    const dateNow = new Date()

    const dateTokenExpires = new Date()
    dateTokenExpires.setHours(dateNow.getHours() + 2)

    const resetPasswordToken = randomBytes(24).toString('hex')
    const resetPasswordExpires = dateTokenExpires

    await this.usersRepository.updateById(user.id, {
      resetPasswordToken,
      resetPasswordExpires
    })

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:8080'

    const linkResetPassword = `${clientUrl}/reset-password?token=${resetPasswordToken}`

    const body = `
      <p>Você solicitou a recuperação de sua conta, para resetar sua senha click no link abaixo:</p>
      <p>${linkResetPassword}</p>
      <p>Se não foi você que solicitou, apenas ignore ou entre em contato com o nosso suporte.</p>
    `

    await this.emailProvider.sendEmail({
      from: '<suporte@test.com>',
      subject: 'Recuperação da conta',
      to: user.email,
      body
    })
  }
}
