import { ListUserOrganizationsController } from './../../../../modules/accounts/controllers/ListUserOrganizationsController'
import { OrganizationMembersRepository } from './../../../../modules/accounts/repositories/OrganizationMembersRepository'
import { ListUserOrganizations } from './../../../../modules/accounts/services/ListUserOrganizations'

export function makeListUserOrganizationsController() {
  const organizationMembersRepository = new OrganizationMembersRepository()
  const listUserOrganizations = new ListUserOrganizations(
    organizationMembersRepository
  )
  const listUserOrganizationsController = new ListUserOrganizationsController(
    listUserOrganizations
  )

  return listUserOrganizationsController
}
