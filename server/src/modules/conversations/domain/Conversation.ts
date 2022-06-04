export type Conversation = {
  readonly id: string
  name: string
  public: boolean
  onlyAdmin: boolean
  ownerId: string
  organizationId: string
  deleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}
