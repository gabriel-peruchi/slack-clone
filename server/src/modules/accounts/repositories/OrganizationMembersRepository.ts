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

type OrganizationMemberWithDetails = {
  id: string
  permission: OrganizationMemberPermissionEnum
  user: {
    id: string
    name: string
    email: string
  }
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
    }).exec()
    return organizationMember?.toObject()
  }

  async findManyByOrganization(
    organizationId: string
  ): Promise<OrganizationMemberWithDetails[]> {
    const organizationMembers = await OrganizationMemberModel.find({
      organizationId
    })
      .populate('user')
      .exec()

    return organizationMembers
      .map((doc) => doc.toObject())
      .map((doc: any) => ({
        id: doc.id,
        permission: doc.permission,
        user: {
          id: doc.user.id,
          name: doc.user.name,
          email: doc.user.email
        }
      }))
  }

  async deleteByUserAndOrganization({
    userId,
    organizationId
  }: FindByUserAndOrganizationParams): Promise<void> {
    await OrganizationMemberModel.deleteOne({
      userId,
      organizationId
    }).exec()
  }
}
