import { existsOrError } from '../../../core/utils/validations'
import { UsersRepository } from '../repositories/UsersRepository'
import { FilesRepository } from './../../files/repositories/FilesRepository'

type UpdateProfileRequest = {
  userId: string
  name: string
  avatarId: string
}

export class UpdateProfile {
  constructor(
    private usersRepository: UsersRepository,
    private filesRepository: FilesRepository
  ) {}

  async execute({ userId, name, avatarId }: UpdateProfileRequest) {
    existsOrError(userId, 'Usuário não informado.')
    existsOrError(name, 'Nome não informado.')
    existsOrError(avatarId, 'Avatar não informado.')

    const userExists = await this.usersRepository.findById(userId)
    existsOrError(userExists, 'Usuário não encontrado.')

    const avatarExists = await this.filesRepository.findById(avatarId)
    existsOrError(avatarExists, 'Avatar não encontrado')

    await this.usersRepository.updateById(userId, {
      name,
      avatarId
    })
  }
}
