import { OrganizationsRepository } from '../repositories/OrganizationsRepository'

type ListOrganizationsRequest = {
  rpp: number
  page: number
  search?: string
}

export class ListOrganizations {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ rpp = 1, page = 20, search }: ListOrganizationsRequest) {
    const organizationsPage = await this.organizationsRepository.search({
      rpp,
      page,
      search
    })

    return organizationsPage
  }
}
