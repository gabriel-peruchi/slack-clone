import { ConversationModel } from '../../../infra/mongoose/models/ConversationModel'
import { Conversation } from '../domain/Conversation'

type ConversationCreateData = {
  name: string
  ownerId: string
  public: boolean
  onlyAdmin: boolean
  organizationId: string
}

export class ConversationsRepository {
  async create(data: ConversationCreateData): Promise<Conversation> {
    const conversationDoc = await ConversationModel.create(data)
    return conversationDoc?.toObject()
  }

  async findById(id: string): Promise<Conversation | undefined> {
    const conversationDoc = await ConversationModel.findOne({ _id: id }).exec()
    return conversationDoc?.toObject()
  }
}
