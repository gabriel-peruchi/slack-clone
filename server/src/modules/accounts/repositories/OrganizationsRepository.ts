import { Page } from '../../../core/models/Page'
import { OrganizationModel } from '../../../infra/mongoose/models/OrganizationModel'
import { Organization } from '../domain/Organization'

type OrganizationCreateData = {
  name: string
  active: boolean
}

type SearchOrganizationsParams = {
  rpp: number
  page: number
  search?: string
}

export class OrganizationsRepository {
  async create(data: OrganizationCreateData): Promise<Organization> {
    const organization = await OrganizationModel.create(data)
    return organization.toObject()
  }

  async findById(id: string): Promise<Organization | undefined> {
    const organization = await OrganizationModel.findById(id).exec()
    return organization?.toObject()
  }

  async updateById(id: string, data: Partial<Organization>): Promise<void> {
    await OrganizationModel.updateOne({ _id: id }, data).exec()
  }

  async search({
    rpp,
    page,
    search
  }: SearchOrganizationsParams): Promise<Page<Organization>> {
    const query: any = {}
    if (search?.trim()) {
      query.name = { $regex: `.*${search}.*`, $options: 'i' }
    }

    const organizations = await OrganizationModel.find(query)
      .sort({ name: 1 })
      .skip(page * rpp - rpp)
      .limit(rpp + 1)
      .exec()

    const organizationsMapped = organizations.map((doc) => doc.toObject())
    const organizationsPage = new Page<Organization>(
      page,
      rpp,
      organizationsMapped
    )
    return organizationsPage
  }
}
