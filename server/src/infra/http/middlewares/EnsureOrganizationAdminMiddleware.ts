import { NextFunction, Request, Response } from 'express'

import { OrganizationMemberPermissionEnum } from '../../../modules/accounts/domain/OrganizationMember'
import { OrganizationMembersRepository } from './../../../modules/accounts/repositories/OrganizationMembersRepository'

export class EnsureOrganizationAdminMiddleware {
  constructor(
    private organizationMembersRepository: OrganizationMembersRepository
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const organizationMember =
      await this.organizationMembersRepository.findByUserAndOrganization({
        userId: request.userId,
        organizationId: request.organizationId
      })

    if (!organizationMember) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    const { permission } = organizationMember

    if (permission !== OrganizationMemberPermissionEnum.ADMIN) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    return next()
  }
}
