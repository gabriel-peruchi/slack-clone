import bcrypt from 'bcryptjs'

import { existsOrError } from '../../../core/utils/validations'
import { OrganizationMembersRepository } from '../repositories/OrganizationMembersRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { OrganizationMemberPermissionEnum } from './../domain/OrganizationMember'
import { OrganizationsRepository } from './../repositories/OrganizationsRepository'

type CreateOrganizationMemberRequest = {
  name: string
  email: string
  organizationId: string
  permission: OrganizationMemberPermissionEnum
}

export class CreateOrganizationMember {
  constructor(
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository,
    private organizationMembersRepository: OrganizationMembersRepository
  ) {}

  async execute({
    name,
    email,
    permission,
    organizationId
  }: CreateOrganizationMemberRequest) {
    existsOrError(name, 'Nome não informado.')
    existsOrError(email, 'Email não informado.')
    existsOrError(permission, 'Permissão não informada.')
    existsOrError(organizationId, 'Organização não informada.')

    const organizationExists = await this.organizationsRepository.findById(
      organizationId
    )
    existsOrError(organizationExists, 'Organização não encontrada.')

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      const organizarionMemberExists =
        await this.organizationMembersRepository.findByUserAndOrganization({
          userId: userExists.id,
          organizationId
        })

      if (organizarionMemberExists) {
        return organizarionMemberExists
      }

      return await this.organizationMembersRepository.create({
        permission,
        organizationId,
        userId: userExists.id
      })
    }

    email = email.toLowerCase()
    const passwordHash = await bcrypt.hash('123456', 8)

    const userCreated = await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    })

    return await this.organizationMembersRepository.create({
      permission,
      organizationId,
      userId: userCreated.id
    })
  }
}
