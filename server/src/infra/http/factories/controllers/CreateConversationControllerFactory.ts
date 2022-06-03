import { OrganizationsRepository } from '../../../../modules/accounts/repositories/OrganizationsRepository'
import { UsersRepository } from '../../../../modules/accounts/repositories/UsersRepository'
import { CreateConversationController } from '../../../../modules/conversations/controllers/CreateConversationController'
import { ConversationsRepository } from '../../../../modules/conversations/repositories/ConversationsRepository'
import { CreateConversation } from '../../../../modules/conversations/services/CreateConversation'

export function makeCreateConversationController() {
  const conversationsRepository = new ConversationsRepository()
  const usersRepository = new UsersRepository()
  const organizationsRepository = new OrganizationsRepository()
  const createConversation = new CreateConversation(
    usersRepository,
    organizationsRepository,
    conversationsRepository
  )
  const createConversationController = new CreateConversationController(
    createConversation
  )

  return createConversationController
}
