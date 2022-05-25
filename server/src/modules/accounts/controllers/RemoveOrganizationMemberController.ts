import { Request, Response } from 'express'

import { RemoveOrganizationMember } from '../services/RemoveOrganizationMember'

export class RemoveOrganizationMemberController {
  constructor(private removeOrganizationMember: RemoveOrganizationMember) {}

  async handle(request: Request, response: Response) {
    await this.removeOrganizationMember.execute({
      memberId: request.params.memberId,
      organizationId: request.organizationId
    })
    return response.end()
  }
}
