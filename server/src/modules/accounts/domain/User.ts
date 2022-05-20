export type User = {
  readonly id: string
  name: string
  email: string
  password: string
  super?: boolean
  avatarId?: string
  createdAt?: Date
  updatedAt?: Date
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}
