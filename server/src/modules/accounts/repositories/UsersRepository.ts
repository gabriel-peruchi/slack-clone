import { UserModel } from '../../../infra/mongoose/models/UserModel'
import { User } from '../domain/User'

export class UsersRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const userDoc = await UserModel.findOne({ email })
      .select('id name email password')
      .exec()
    return userDoc?.toObject()
  }
}
