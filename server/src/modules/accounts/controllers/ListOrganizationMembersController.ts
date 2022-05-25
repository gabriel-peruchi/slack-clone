import { Request, Response } from 'express'

import { ListOrganizationMembers } from '../services/ListOrganizationMembers'

export class ListOrganizationMembersController {
  constructor(private listOrganizationMembers: ListOrganizationMembers) {}

  async handle(request: Request, response: Response) {
    const data = await this.listOrganizationMembers.execute({
      organizationId: request.organizationId
    })
    return response.json(data)
  }
}
