import { Request, Response, NextFunction } from 'express'

import { AppError } from '../../../core/errors/AppError'

export class ErrorMiddleware {
  handle(error: Error, request: Request, response: Response, _: NextFunction) {
    console.error(error)

    if (error instanceof AppError) {
      return response.status(400).json({ error: error.message })
    }

    return response.status(500).json({ error: 'Erro interno.' })
  }
}
