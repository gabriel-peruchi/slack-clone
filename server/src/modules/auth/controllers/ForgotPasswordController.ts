import { Request, Response } from 'express'

import { ForgotPassword } from '../services/ForgotPassword'

export class ForgotPasswordController {
  constructor(private forgotPassword: ForgotPassword) {}

  async handle(request: Request, response: Response) {
    await this.forgotPassword.execute({ ...request.body })
    return response.end()
  }
}
