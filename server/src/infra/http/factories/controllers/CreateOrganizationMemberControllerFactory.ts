import { OrganizationsRepository } from '../../../../modules/accounts/repositories/OrganizationsRepository'
import { CreateOrganizationMemberController } from './../../../../modules/accounts/controllers/CreateOrganizationMemberController'
import { OrganizationMembersRepository } from './../../../../modules/accounts/repositories/OrganizationMembersRepository'
import { UsersRepository } from './../../../../modules/accounts/repositories/UsersRepository'
import { CreateOrganizationMember } from './../../../../modules/accounts/services/CreateOrganizationMember'

export function makeCreateOrganizationMemberController() {
  const usersRepository = new UsersRepository()
  const organizationsRepository = new OrganizationsRepository()
  const organizationMembersRepository = new OrganizationMembersRepository()
  const createOrganizationMember = new CreateOrganizationMember(
    usersRepository,
    organizationsRepository,
    organizationMembersRepository
  )
  const createOrganizationMemberController =
    new CreateOrganizationMemberController(createOrganizationMember)

  return createOrganizationMemberController
}
