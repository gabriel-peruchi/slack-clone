import { Request, Response } from 'express'

import { UpdateOrganizationStatus } from '../services/UpdateOrganizationStatus'

export class UpdateOrganizationStatusController {
  constructor(private updateOrganizationStatus: UpdateOrganizationStatus) {}

  async handle(request: Request, response: Response) {
    await this.updateOrganizationStatus.execute({
      organizationId: request.params.organizationId,
      active: request.body.active
    })
    return response.end()
  }
}
