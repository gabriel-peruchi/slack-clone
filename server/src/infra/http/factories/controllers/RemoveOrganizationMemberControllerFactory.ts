import { RemoveOrganizationMemberController } from '../../../../modules/accounts/controllers/RemoveOrganizationMemberController'
import { OrganizationMembersRepository } from '../../../../modules/accounts/repositories/OrganizationMembersRepository'
import { RemoveOrganizationMember } from '../../../../modules/accounts/services/RemoveOrganizationMember'

export function makeRemoveOrganizationMemberController() {
  const organizationMembersRepository = new OrganizationMembersRepository()
  const removeOrganizationMember = new RemoveOrganizationMember(
    organizationMembersRepository
  )
  const removeOrganizationMemberController =
    new RemoveOrganizationMemberController(removeOrganizationMember)

  return removeOrganizationMemberController
}
