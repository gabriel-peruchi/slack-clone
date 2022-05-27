import { UpdateOrganizationStatusController } from '../../../../modules/accounts/controllers/UpdateOrganizationStatusController'
import { OrganizationsRepository } from '../../../../modules/accounts/repositories/OrganizationsRepository'
import { UpdateOrganizationStatus } from './../../../../modules/accounts/services/UpdateOrganizationStatus'

export function makeUpdateOrganizationStatusController() {
  const organizationsRepository = new OrganizationsRepository()
  const updateOrganizationStatus = new UpdateOrganizationStatus(
    organizationsRepository
  )
  const updateOrganizationStatusController =
    new UpdateOrganizationStatusController(updateOrganizationStatus)

  return updateOrganizationStatusController
}
