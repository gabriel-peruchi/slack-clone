import { UserModel } from '../../../infra/mongoose/models/UserModel'
import { User } from '../domain/User'

type UserCreateData = {
  name: string
  email: string
  password: string
}

type UserWithDetails = {
  id: string
  name: string
  email: string
  avatar?: {
    id: string
    url: string
  }
}

export class UsersRepository {
  async create(data: UserCreateData): Promise<User> {
    const userDoc = await UserModel.create(data)
    return userDoc?.toObject()
  }

  async findById(id: string): Promise<User | undefined> {
    const userDoc = await UserModel.findOne({ _id: id }).exec()
    return userDoc?.toObject()
  }

  async findByIdWithDetails(id: string): Promise<UserWithDetails | undefined> {
    const userDoc = await UserModel.findOne({ _id: id })
      .populate('avatar')
      .exec()

    if (!userDoc) {
      return
    }

    const userObject: any = userDoc.toObject()

    return {
      id: userObject.id,
      name: userObject.name,
      email: userObject.email,
      avatar: userObject.avatar
        ? {
            id: userObject.avatar.id,
            url: userObject.avatar.url
          }
        : undefined
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userDoc = await UserModel.findOne({ email })
      .select('id name email password super')
      .exec()
    return userDoc?.toObject()
  }

  async findByTokenResetPassword(token: string): Promise<User | undefined> {
    const userDoc = await UserModel.findOne({
      resetPasswordToken: token
    }).exec()
    return userDoc?.toObject()
  }

  async updateById(id: string, data: Partial<User>): Promise<void> {
    await UserModel.updateOne({ _id: id }, data).exec()
  }
}
