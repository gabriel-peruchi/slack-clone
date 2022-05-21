import { EnsureSuperUserMiddleware } from '../../middlewares/EnsureSuperUserMiddleware'

export function makeEnsureSuperUserMiddleware() {
  const ensureSuperUserMiddleware = new EnsureSuperUserMiddleware()

  return ensureSuperUserMiddleware
}
