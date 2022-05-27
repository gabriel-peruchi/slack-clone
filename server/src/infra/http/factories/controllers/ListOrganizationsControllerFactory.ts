import { ListOrganizationsController } from '../../../../modules/accounts/controllers/ListOrganizations'
import { OrganizationsRepository } from '../../../../modules/accounts/repositories/OrganizationsRepository'
import { ListOrganizations } from './../../../../modules/accounts/services/ListOrganizations'

export function makeListOrganizationsController() {
  const organizationsRepository = new OrganizationsRepository()
  const listOrganizations = new ListOrganizations(organizationsRepository)
  const listOrganizationsController = new ListOrganizationsController(
    listOrganizations
  )

  return listOrganizationsController
}
