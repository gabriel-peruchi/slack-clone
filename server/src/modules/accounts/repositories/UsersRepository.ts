import { UserModel } from '../../../infra/mongoose/models/UserModel'
import { User } from '../domain/User'

type UserCreateData = {
  name: string
  email: string
  password: string
}

export class UsersRepository {
  async create(data: UserCreateData): Promise<User> {
    const userDoc = await UserModel.create(data)
    return userDoc?.toObject()
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
