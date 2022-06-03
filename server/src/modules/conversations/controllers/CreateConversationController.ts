import { Request, Response } from 'express'

import { CreateConversation } from './../services/CreateConversation'

export class CreateConversationController {
  constructor(private createConversation: CreateConversation) {}

  async handle(request: Request, response: Response) {
    const data = await this.createConversation.execute({
      ...request.body,
      userId: request.userId,
      organizationId: request.organizationId
    })
    return response.json(data)
  }
}
