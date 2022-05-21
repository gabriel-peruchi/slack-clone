import { existsOrError } from '../../../core/utils/validations'
import { OrganizationsRepository } from './../repositories/OrganizationsRepository'

type CreateOrganizationRequest = {
  name: string
}

export class CreateOrganization {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ name }: CreateOrganizationRequest) {
    existsOrError(name, 'Nome não informado.')

    const organization = await this.organizationsRepository.create({
      name,
      active: true
    })

    return organization
  }
}
