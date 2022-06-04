import { Schema, model, Types } from 'mongoose'

import { Conversation } from '../../../modules/conversations/domain/Conversation'
import { OrganizationModel } from './OrganizationModel'
import { UserModel } from './UserModel'

const ConversationSchema = new Schema<Conversation>(
  {
    name: {
      type: String,
      required: true
    },
    public: {
      type: Boolean,
      default: false
    },
    onlyAdmin: {
      type: Boolean,
      default: false
    },
    deleted: {
      type: Boolean,
      default: false
    },
    ownerId: {
      type: Types.ObjectId as any,
      ref: UserModel,
      required: true
    },
    organizationId: {
      type: Types.ObjectId as any,
      ref: OrganizationModel,
      required: true
    }
  },
  { timestamps: true }
)

ConversationSchema.pre('find', function () {
  this.setQuery({
    ...this.getQuery(),
    deleted: { $ne: true }
  })
})

const ConversationModel = model<Conversation>(
  'Conversation',
  ConversationSchema,
  'conversations'
)

export { ConversationModel }
