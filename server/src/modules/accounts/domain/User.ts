import bcrypt from 'bcryptjs'

export type User = {
  readonly id: string
  name: string
  email: string
  password: string
  super?: boolean
  avatarId?: string
  createdAt?: Date
  updatedAt?: Date
  resetPasswordToken?: string | null
  resetPasswordExpires?: Date | null
}

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 8)
}
