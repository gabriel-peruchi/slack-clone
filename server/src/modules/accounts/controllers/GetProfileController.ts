import { Request, Response } from 'express'

import { GetProfile } from '../services/GetProfile'

export class GetProfileController {
  constructor(private getProfile: GetProfile) {}

  async handle(request: Request, response: Response) {
    const data = await this.getProfile.execute({ userId: request.userId })
    return response.json(data)
  }
}
