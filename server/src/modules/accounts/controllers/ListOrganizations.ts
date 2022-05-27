import { Request, Response } from 'express'

import { ListOrganizations } from '../services/ListOrganizations'

export class ListOrganizationsController {
  constructor(private ListOrganizations: ListOrganizations) {}

  async handle(request: Request, response: Response) {
    const rpp = Number(request.query.rpp || 10)
    const page = Number(request.query.page || 1)

    const data = await this.ListOrganizations.execute({
      rpp,
      page,
      search: request.query.search as string
    })
    return response.json(data)
  }
}
