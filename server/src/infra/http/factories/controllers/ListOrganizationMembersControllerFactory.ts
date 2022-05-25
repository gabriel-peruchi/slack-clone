import { OrganizationMembersRepository } from '../../../../modules/accounts/repositories/OrganizationMembersRepository'
import { ListOrganizationMembersController } from './../../../../modules/accounts/controllers/ListOrganizationMembersController'
import { ListOrganizationMembers } from './../../../../modules/accounts/services/ListOrganizationMembers'

export function makeListOrganizationMembersController() {
  const organizationMembersRepository = new OrganizationMembersRepository()
  const listOrganizationMembers = new ListOrganizationMembers(
    organizationMembersRepository
  )
  const listOrganizationMembersController =
    new ListOrganizationMembersController(listOrganizationMembers)

  return listOrganizationMembersController
}
