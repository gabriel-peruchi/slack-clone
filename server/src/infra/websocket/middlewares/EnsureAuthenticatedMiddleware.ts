import { verify } from 'jsonwebtoken'
import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'

import auth from '../../../config/auth'
import { OrganizationMembersRepository } from './../../../modules/accounts/repositories/OrganizationMembersRepository'
import { OrganizationsRepository } from './../../../modules/accounts/repositories/OrganizationsRepository'

type AuthPayload = {
  id: string
  name: string
  email: string
  super: boolean
  organizationId: string
}

export class EnsureAuthenticatedMiddleware {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private organizationMembersRepository: OrganizationMembersRepository
  ) {}

  async handle(socket: Socket, next: (err?: ExtendedError) => void) {
    const accessToken = socket.handshake.auth.token
    const organizationId = socket.nsp.name.replace('/', '')

    if (!accessToken) {
      return next(new Error('Não autorizado.'))
    }

    if (!organizationId) {
      return next(new Error('Não autorizado.'))
    }

    let authPayload: AuthPayload | null = null

    try {
      authPayload = verify(accessToken, auth.secretKey) as AuthPayload
    } catch (error) {
      return next(new Error('Não autorizado.'))
    }

    const organization = await this.organizationsRepository.findById(
      organizationId
    )

    if (!organization) {
      return next(new Error('Não autorizado.'))
    }

    if (!organization.active) {
      return next(new Error('Não autorizado.'))
    }

    authPayload.organizationId = organizationId

    const organizationMember =
      await this.organizationMembersRepository.findByUserAndOrganization({
        userId: authPayload.id,
        organizationId
      })

    if (!organizationMember) {
      return next(new Error('Não autorizado.'))
    }

    ;(socket as any).request.userId = authPayload.id
    ;(socket as any).request.organizationId = authPayload.organizationId

    return next()
  }
}
