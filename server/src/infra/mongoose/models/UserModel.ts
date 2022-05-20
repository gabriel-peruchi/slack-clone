import { Schema, model } from 'mongoose'

import { User } from '../../../modules/accounts/domain/User'

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
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    }
  },
  { timestamps: true }
)

const UserModel = model<User>('User', UserSchema, 'users')

export { UserModel }
