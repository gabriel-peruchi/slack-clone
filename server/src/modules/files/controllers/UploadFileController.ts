import { Request, Response } from 'express'

import { UploadFile } from '../services/UploadFile'

export class UploadFileController {
  constructor(private uploadFile: UploadFile) {}

  async handle(request: Request, response: Response) {
    const file = request.file as Express.Multer.File
    const fileCreated = await this.uploadFile.execute(file)
    return response.json(fileCreated)
  }
}
