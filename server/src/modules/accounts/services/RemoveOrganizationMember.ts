import { existsOrError } from '../../../core/utils/validations'
import { OrganizationMembersRepository } from './../repositories/OrganizationMembersRepository'

type RemoveOrganizationMemberRequest = {
  memberId: string
  organizationId: string
}

export class RemoveOrganizationMember {
  constructor(
    private organizationMembersRepository: OrganizationMembersRepository
  ) {}

  async execute({ memberId, organizationId }: RemoveOrganizationMemberRequest) {
    existsOrError(memberId, 'Membro não informado.')
    existsOrError(organizationId, 'Organização não informada.')

    const organizationMemberExists =
      await this.organizationMembersRepository.findByUserAndOrganization({
        userId: memberId,
        organizationId
      })

    existsOrError(
      organizationMemberExists,
      'Membro da organização não encontrado.'
    )

    await this.organizationMembersRepository.deleteByUserAndOrganization({
      userId: memberId,
      organizationId
    })
  }
}
