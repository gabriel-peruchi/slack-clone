import { OrganizationMembersRepository } from '../../../../modules/accounts/repositories/OrganizationMembersRepository'
import { GetConversationsController } from '../../../../modules/conversations/controllers/GetConversationsController'
import { ConversationsRepository } from '../../../../modules/conversations/repositories/ConversationsRepository'
import { GetConversations } from '../../../../modules/conversations/services/GetConversations'

export function makeGetConversationsController() {
  const conversationsRepository = new ConversationsRepository()
  const organizationMembersRepository = new OrganizationMembersRepository()
  const getConversations = new GetConversations(
    conversationsRepository,
    organizationMembersRepository
  )
  const getConversationsController = new GetConversationsController(
    getConversations
  )

  return getConversationsController
}
