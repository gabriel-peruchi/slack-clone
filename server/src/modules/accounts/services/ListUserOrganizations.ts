import { existsOrError } from '../../../core/utils/validations'
import { OrganizationMembersRepository } from '../repositories/OrganizationMembersRepository'

type ListUserOrganizationsRequest = {
  userId: string
}

export class ListUserOrganizations {
  constructor(
    private organizationMembersRepository: OrganizationMembersRepository
  ) {}

  async execute({ userId }: ListUserOrganizationsRequest) {
    existsOrError(userId, 'Usuário não informado.')

    const organizationMembers =
      await this.organizationMembersRepository.findManyByUser(userId)

    const organizations = organizationMembers
      .filter(({ organization }) => organization.active)
      .map(({ organization }) => organization)

    return organizations
  }
}
