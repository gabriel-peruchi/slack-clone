export type Conversation = {
  readonly id: string
  name: string
  public: boolean
  onlyAdmin: boolean
  ownerId: string
  organizationId: string
  createdAt?: Date
  updatedAt?: Date
}
