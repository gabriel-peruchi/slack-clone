import { Request, Response } from 'express'

import { CreateOrganization } from './../services/CreateOrganization'

export class CreateOrganizationController {
  constructor(private createOrganization: CreateOrganization) {}

  async handle(request: Request, response: Response) {
    const organizationRes = await this.createOrganization.execute({
      ...request.body
    })
    return response.json(organizationRes)
  }
}
