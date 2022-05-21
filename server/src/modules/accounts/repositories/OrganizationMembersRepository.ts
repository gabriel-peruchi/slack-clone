import { OrganizationMemberModel } from '../../../infra/mongoose/models/OrganizationMemberModel'
import {
  OrganizationMember,
  OrganizationMemberPermissionEnum
} from './../domain/OrganizationMember'

type OrganizationMemberCreateData = {
  userId: string
  organizationId: string
  permission: OrganizationMemberPermissionEnum
}

type FindByUserAndOrganizationParams = {
  userId: string
  organizationId: string
}

export class OrganizationMembersRepository {
  async create(
    data: OrganizationMemberCreateData
  ): Promise<OrganizationMember> {
    const organizationMember = await OrganizationMemberModel.create(data)
    return organizationMember.toObject()
  }

  async findByUserAndOrganization({
    userId,
    organizationId
  }: FindByUserAndOrganizationParams): Promise<OrganizationMember | undefined> {
    const organizationMember = await OrganizationMemberModel.findOne({
      userId,
      organizationId
    })
    return organizationMember?.toObject()
  }
}
