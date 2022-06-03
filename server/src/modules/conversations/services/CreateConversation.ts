import { existsOrError } from '../../../core/utils/validations'
import { UsersRepository } from '../../accounts/repositories/UsersRepository'
import { OrganizationsRepository } from './../../accounts/repositories/OrganizationsRepository'
import { ConversationsRepository } from './../repositories/ConversationsRepository'

type CreateConversationRequest = {
  name: string
  userId: string
  onlyAdmin: boolean
  organizationId: string
}

export class CreateConversation {
  constructor(
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository,
    private conversationsRepository: ConversationsRepository
  ) {}

  async execute({
    name,
    userId,
    onlyAdmin,
    organizationId
  }: CreateConversationRequest) {
    existsOrError(name, 'Nome não informado.')
    existsOrError(userId, 'Usuário não informado.')
    existsOrError(organizationId, 'Organização não informada.')

    const userExists = await this.usersRepository.findById(userId)
    existsOrError(userExists, 'Usuário não encontrado.')

    const organizationExists = await this.organizationsRepository.findById(
      organizationId
    )
    existsOrError(organizationExists, 'Organização não encontrada.')

    return await this.conversationsRepository.create({
      name,
      onlyAdmin,
      organizationId,
      ownerId: userId,
      public: !onlyAdmin
    })
  }
}
