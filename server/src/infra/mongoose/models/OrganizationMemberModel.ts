import { Schema, model, Types } from 'mongoose'

import { OrganizationMember } from '../../../modules/accounts/domain/OrganizationMember'
import { OrganizationMemberPermissionEnum } from './../../../modules/accounts/domain/OrganizationMember'
import { OrganizationModel } from './OrganizationModel'
import { UserModel } from './UserModel'

const OrganizationMemberSchema = new Schema<OrganizationMember>(
  {
    userId: {
      type: Types.ObjectId as any,
      ref: UserModel,
      required: true
    },
    organizationId: {
      type: Types.ObjectId as any,
      ref: OrganizationModel,
      required: true
    },
    permission: {
      type: String,
      default: OrganizationMemberPermissionEnum.GENERAL,
      enum: OrganizationMemberPermissionEnum,
      required: true
    }
  },
  { timestamps: true }
)

OrganizationMemberSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})

const OrganizationMemberModel = model<OrganizationMember>(
  'OrganizationMember',
  OrganizationMemberSchema,
  'organization_members'
)

export { OrganizationMemberModel }
