import { EnsureOrganizationAdminMiddleware } from '../../middlewares/EnsureOrganizationAdminMiddleware'
import { OrganizationMembersRepository } from './../../../../modules/accounts/repositories/OrganizationMembersRepository'

export function makeEnsureOrganizationAdminMiddleware() {
  const organizationMembersRepository = new OrganizationMembersRepository()
  const ensureOrganizationAdminMiddleware =
    new EnsureOrganizationAdminMiddleware(organizationMembersRepository)

  return ensureOrganizationAdminMiddleware
}
