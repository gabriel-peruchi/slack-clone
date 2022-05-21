import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import authConfig from '../../../config/auth'
import { AppError } from '../../../core/errors/AppError'
import { existsOrError } from '../../../core/utils/validations'
import { User } from '../../accounts/domain/User'
import { UsersRepository } from '../../accounts/repositories/UsersRepository'

type AuthenticateRequest = {
  email: string
  password: string
}

type AuthenticateResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
    super: boolean
  }
}

export class Authenticate {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    existsOrError(email, 'Email não informado.')
    existsOrError(password, 'Senha não informada.')

    const userExists = await this.usersRepository.findByEmail(email)
    existsOrError(userExists, 'Usuário não existe.')

    const user = userExists as User
    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
      throw new AppError('Email/senha incorretos.')
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        super: user.super || false
      },
      authConfig.secretKey,
      { subject: user.id }
    )

    const responseAuth: AuthenticateResponse = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        super: user.super || false
      }
    }

    return responseAuth
  }
}
