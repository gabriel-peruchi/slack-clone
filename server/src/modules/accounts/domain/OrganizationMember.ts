export enum OrganizationMemberPermissionEnum {
  ADMIN = 'ADMIN',
  GENERAL = 'GENERAL'
}

export type OrganizationMember = {
  readonly id: string
  userId: string
  organizationId: string
  permission: OrganizationMemberPermissionEnum
  createdAt?: Date
  updatedAt?: Date
}
