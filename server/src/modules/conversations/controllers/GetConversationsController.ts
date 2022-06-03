import { Request, Response } from 'express'

import { GetConversations } from './../services/GetConversations'

export class GetConversationsController {
  constructor(private getConversations: GetConversations) {}

  async handle(request: Request, response: Response) {
    const data = await this.getConversations.execute({
      userId: request.userId,
      organizationId: request.organizationId
    })
    return response.json(data)
  }
}
