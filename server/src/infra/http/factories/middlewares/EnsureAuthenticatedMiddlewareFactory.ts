import { EnsureAuthenticatedMiddleware } from '../../middlewares/EnsureAuthenticatedMiddleware'

export function makeEnsureAuthenticatedMiddleware() {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware()

  return ensureAuthenticatedMiddleware
}
