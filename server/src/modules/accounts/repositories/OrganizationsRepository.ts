import { OrganizationModel } from '../../../infra/mongoose/models/OrganizationModel'
import { Organization } from '../domain/Organization'

type OrganizationCreateData = {
  name: string
  active: boolean
}

export class OrganizationsRepository {
  async create(data: OrganizationCreateData): Promise<Organization> {
    const organization = await OrganizationModel.create(data)
    return organization.toObject()
  }
}
