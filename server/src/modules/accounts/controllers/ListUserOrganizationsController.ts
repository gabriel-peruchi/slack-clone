import { Request, Response } from 'express'

import { ListUserOrganizations } from '../services/ListUserOrganizations'

export class ListUserOrganizationsController {
  constructor(private listUserOrganizations: ListUserOrganizations) {}

  async handle(request: Request, response: Response) {
    const data = await this.listUserOrganizations.execute({
      userId: request.userId
    })
    return response.json(data)
  }
}
