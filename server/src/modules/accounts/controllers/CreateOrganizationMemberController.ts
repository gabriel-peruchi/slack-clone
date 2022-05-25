import { Request, Response } from 'express'

import { CreateOrganizationMember } from '../services/CreateOrganizationMember'

export class CreateOrganizationMemberController {
  constructor(private createOrganizationMember: CreateOrganizationMember) {}

  async handle(request: Request, response: Response) {
    const organizationMemberRes = await this.createOrganizationMember.execute({
      ...request.body,
      organizationId: request.organizationId
    })
    return response.json(organizationMemberRes)
  }
}
