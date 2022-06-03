import { existsOrError } from '../../../core/utils/validations'
import { OrganizationMemberPermissionEnum } from '../../accounts/domain/OrganizationMember'
import { ConversationsRepository } from '../repositories/ConversationsRepository'
import { OrganizationMembersRepository } from './../../accounts/repositories/OrganizationMembersRepository'

type GetConversationsRequest = {
  userId: string
  organizationId: string
}

export class GetConversations {
  constructor(
    private conversationsRepository: ConversationsRepository,
    private organizationMembersRepository: OrganizationMembersRepository
  ) {}

  async execute({ userId, organizationId }: GetConversationsRequest) {
    existsOrError(userId, 'Usuário não informado.')
    existsOrError(organizationId, 'Organização não informada.')

    const organizationMemberExists =
      await this.organizationMembersRepository.findByUserAndOrganization({
        userId,
        organizationId
      })
    existsOrError(
      organizationMemberExists,
      'Membro da organização não encontrado.'
    )

    const allConversations =
      await this.conversationsRepository.getAllByOrganization(organizationId)

    if (
      organizationMemberExists?.permission ===
      OrganizationMemberPermissionEnum.ADMIN
    ) {
      return allConversations
    }

    return allConversations.filter(({ onlyAdmin }) => !onlyAdmin)
  }
}
