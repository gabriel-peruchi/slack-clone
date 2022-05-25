import { existsOrError } from '../../../core/utils/validations'
import { OrganizationMembersRepository } from './../repositories/OrganizationMembersRepository'

type ListOrganizationMembersRequest = {
  organizationId: string
}

export class ListOrganizationMembers {
  constructor(
    private organizationMembersRepository: OrganizationMembersRepository
  ) {}

  async execute({ organizationId }: ListOrganizationMembersRequest) {
    existsOrError(organizationId, 'Organização não informada.')

    const organizationMembers =
      await this.organizationMembersRepository.findManyByOrganization(
        organizationId
      )

    const members = organizationMembers.map(({ user }) => user)

    return members
  }
}
