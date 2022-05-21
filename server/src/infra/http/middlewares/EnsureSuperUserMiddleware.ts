import { NextFunction, Request, Response } from 'express'

export class EnsureSuperUserMiddleware {
  handle(request: Request, response: Response, next: NextFunction) {
    if (request.userSuper) {
      return next()
    }

    return response.status(401).json({ error: 'Não autorizado.' })
  }
}
