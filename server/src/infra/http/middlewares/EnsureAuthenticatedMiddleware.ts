import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '../../../config/auth'
import { OrganizationMembersRepository } from './../../../modules/accounts/repositories/OrganizationMembersRepository'
import { OrganizationsRepository } from './../../../modules/accounts/repositories/OrganizationsRepository'

type AuthPayload = {
  id: string
  name: string
  email: string
  super: boolean
}

type AuthOptions = {
  skipOrganization?: boolean
}

export class EnsureAuthenticatedMiddleware {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private organizationMembersRepository: OrganizationMembersRepository
  ) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    options?: AuthOptions
  ) {
    const bearerToken = request.headers.authorization
    const organizationId = request.headers.organization as string

    if (!bearerToken) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    const token = bearerToken.split(' ')[1]

    try {
      const authPayload = verify(token, auth.secretKey) as AuthPayload

      request.userId = authPayload.id
      request.userSuper = authPayload.super
      request.organizationId = organizationId
    } catch (error) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    if (options?.skipOrganization) {
      return next()
    }

    if (!organizationId) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    const organization = await this.organizationsRepository.findById(
      organizationId
    )

    if (!organization) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    if (!organization.active) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    const organizationMember =
      await this.organizationMembersRepository.findByUserAndOrganization({
        userId: request.userId,
        organizationId
      })

    if (!organizationMember) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    return next()
  }
}
