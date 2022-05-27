import { existsOrError } from '../../../core/utils/validations'
import { OrganizationsRepository } from '../repositories/OrganizationsRepository'

type UpdateOrganizationStatusRequest = {
  organizationId: string
  active: boolean
}

export class UpdateOrganizationStatus {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ organizationId, active }: UpdateOrganizationStatusRequest) {
    existsOrError(organizationId, 'Organização não informada.')
    existsOrError(active, 'Status não informado.')

    await this.organizationsRepository.updateById(organizationId, { active })
  }
}
