import { existsOrError } from '../../../core/utils/validations'
import { ConversationsRepository } from './../repositories/ConversationsRepository'

type RemoveConversationRequest = {
  conversationId: string
}

export class RemoveConversation {
  constructor(private conversationsRepository: ConversationsRepository) {}

  async execute({ conversationId }: RemoveConversationRequest) {
    existsOrError(conversationId, 'Conversação não informada.')

    const conversation = await this.conversationsRepository.findById(
      conversationId
    )
    existsOrError(conversation, 'Conversação não encontrada.')

    await this.conversationsRepository.updateById(conversationId, {
      deleted: true
    })
  }
}
