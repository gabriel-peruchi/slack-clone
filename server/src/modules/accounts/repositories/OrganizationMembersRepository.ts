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
  organization: {
    id: string
    name: string
    active: boolean
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
      .populate('user organization')
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
        },
        organization: {
          id: doc.organization.id,
          name: doc.organization.name,
          active: doc.organization.active
        }
      }))
  }

  async findManyByUser(
    userId: string
  ): Promise<OrganizationMemberWithDetails[]> {
    const organizationMembers = await OrganizationMemberModel.find({ userId })
      .populate('user organization')
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
        },
        organization: {
          id: doc.organization.id,
          name: doc.organization.name,
          active: doc.organization.active
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
