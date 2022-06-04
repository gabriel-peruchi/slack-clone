import { Request, Response } from 'express'

import { RemoveConversation } from '../services/RemoveConversation'

export class RemoveConversationController {
  constructor(private removeConversation: RemoveConversation) {}

  async handle(request: Request, response: Response) {
    await this.removeConversation.execute({
      conversationId: request.params.conversationId
    })
    return response.end()
  }
}
