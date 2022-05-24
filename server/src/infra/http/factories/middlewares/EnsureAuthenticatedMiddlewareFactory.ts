import { EnsureAuthenticatedMiddleware } from '../../middlewares/EnsureAuthenticatedMiddleware'
import { OrganizationsRepository } from './../../../../modules/accounts/repositories/OrganizationsRepository'

export function makeEnsureAuthenticatedMiddleware() {
  const organizationsRepository = new OrganizationsRepository()
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    organizationsRepository
  )

  return ensureAuthenticatedMiddleware
}
