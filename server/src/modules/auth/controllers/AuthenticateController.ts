import { Request, Response } from 'express'

import { Authenticate } from '../services/Authenticate'

export class AuthenticateController {
  constructor(private authenticate: Authenticate) {}

  async handle(request: Request, response: Response) {
    const authRes = await this.authenticate.execute({ ...request.body })
    return response.json(authRes)
  }
}
