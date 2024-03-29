import { OrganizationMembersRepository } from '../../../../modules/accounts/repositories/OrganizationMembersRepository'
import { OrganizationsRepository } from '../../../../modules/accounts/repositories/OrganizationsRepository'
import { EnsureAuthenticatedMiddleware } from '../../middlewares/EnsureAuthenticatedMiddleware'

export function makeEnsureAuthenticatedMiddleware() {
  const organizationsRepository = new OrganizationsRepository()
  const organizationMembersRepository = new OrganizationMembersRepository()
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    organizationsRepository,
    organizationMembersRepository
  )

  return ensureAuthenticatedMiddleware
}
