import { RemoveConversationController } from '../../../../modules/conversations/controllers/RemoveConversationController'
import { ConversationsRepository } from '../../../../modules/conversations/repositories/ConversationsRepository'
import { RemoveConversation } from '../../../../modules/conversations/services/RemoveConversation'

export function makeRemoveConversationController() {
  const conversationsRepository = new ConversationsRepository()
  const removeConversation = new RemoveConversation(conversationsRepository)
  const removeConversationController = new RemoveConversationController(
    removeConversation
  )

  return removeConversationController
}
