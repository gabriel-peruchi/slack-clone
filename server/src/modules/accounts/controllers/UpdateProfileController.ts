import { Request, Response } from 'express'

import { UpdateProfile } from './../services/UpdateProfile'

export class UpdateProfileController {
  constructor(private updateProfile: UpdateProfile) {}

  async handle(request: Request, response: Response) {
    await this.updateProfile.execute({
      userId: request.userId,
      ...request.body
    })
    return response.end()
  }
}
