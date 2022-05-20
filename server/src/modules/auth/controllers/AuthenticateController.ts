import { Request, Response } from 'express'

import { AuthenticateService } from '../services/AuthenticateService'

export class AuthenticateController {
  constructor(private authenticateService: AuthenticateService) {}

  async handle(request: Request, response: Response) {
    const authRes = await this.authenticateService.execute({ ...request.body })
    return response.json(authRes)
  }
}
