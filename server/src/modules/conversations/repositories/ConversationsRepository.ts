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

  async getAllByOrganization(organizationId: string): Promise<Conversation[]> {
    const conversationsDocs = await ConversationModel.find({
      organizationId
    }).exec()
    return conversationsDocs.map((doc) => doc.toObject())
  }

  async updateById(id: string, data: Partial<Conversation>): Promise<void> {
    await ConversationModel.updateOne({ _id: id }, data).exec()
  }
}
