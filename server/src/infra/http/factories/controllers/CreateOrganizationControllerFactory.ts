import { CreateOrganization } from '../../../../modules/accounts/services/CreateOrganization'
import { CreateOrganizationController } from './../../../../modules/accounts/controllers/CreateOrganizationController'
import { OrganizationsRepository } from './../../../../modules/accounts/repositories/OrganizationsRepository'

export function makeCreateOrganizationController() {
  const organizationsRepository = new OrganizationsRepository()
  const createOrganization = new CreateOrganization(organizationsRepository)
  const createOrganizationController = new CreateOrganizationController(
    createOrganization
  )

  return createOrganizationController
}
