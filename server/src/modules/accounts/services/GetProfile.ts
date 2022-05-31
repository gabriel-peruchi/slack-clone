import { existsOrError } from '../../../core/utils/validations'
import { UsersRepository } from './../repositories/UsersRepository'

type GetProfileRequest = {
  userId: string
}

export class GetProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetProfileRequest) {
    existsOrError(userId, 'Usuário não informado.')
    const user = await this.usersRepository.findByIdWithDetails(userId)

    return user
  }
}
