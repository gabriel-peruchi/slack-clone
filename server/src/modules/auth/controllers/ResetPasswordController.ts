import { Request, Response } from 'express'

import { ResetPassword } from '../services/ResetPassword'

export class ResetPasswordController {
  constructor(private resetPassword: ResetPassword) {}

  async handle(request: Request, response: Response) {
    await this.resetPassword.execute({ ...request.body })
    return response.end()
  }
}
