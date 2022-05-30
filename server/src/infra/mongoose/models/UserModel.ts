import { Schema, model, Types } from 'mongoose'

import { User } from '../../../modules/accounts/domain/User'
import { FileModel } from './FileModel'

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    super: {
      type: Boolean,
      default: false
    },
    avatarId: {
      type: Types.ObjectId as any,
      ref: FileModel,
      default: null
    },
    resetPasswordToken: {
      type: String,
      default: null
    },
    resetPasswordExpires: {
      type: Date,
      defaul: null
    }
  },
  { timestamps: true }
)

UserSchema.virtual('avatar', {
  ref: 'File',
  localField: 'avatarId',
  foreignField: '_id',
  justOne: true
})

const UserModel = model<User>('User', UserSchema, 'users')

export { UserModel }
