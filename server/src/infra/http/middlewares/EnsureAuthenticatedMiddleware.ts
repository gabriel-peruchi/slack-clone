import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '../../../config/auth'

type AuthPayload = {
  id: string
  name: string
  email: string
}

export class EnsureAuthenticatedMiddleware {
  handle(request: Request, response: Response, next: NextFunction) {
    const bearerToken = request.headers.authorization

    if (!bearerToken) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }

    const token = bearerToken.split(' ')[1]

    try {
      const authPayload = verify(token, auth.secretKey) as AuthPayload

      request.userId = authPayload.id

      return next()
    } catch (error) {
      return response.status(401).json({ error: 'Não autorizado.' })
    }
  }
}
