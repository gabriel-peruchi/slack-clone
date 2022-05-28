import FileType from 'file-type'
import { unlinkSync } from 'fs'

import { AppError } from '../../../core/errors/AppError'
import { addHours } from '../../../core/utils/date'
import { generateKeyByFilename } from '../../../core/utils/file'
import { StorageProvider } from '../../../infra/providers/StorageProvider'
import { FilesRepository } from '../repositories/FilesRepository'

type UploadFileRequest = {
  path: string
  size: number
  originalname: string
}

export class UploadFile {
  constructor(
    private storageProvider: StorageProvider,
    private filesRepository: FilesRepository
  ) {}

  async execute(file: UploadFileRequest) {
    if (!file) {
      throw new AppError('Arquivo não informado.')
    }

    const filename = file.originalname
    const fileSize = file.size
    const filePath = file.path
    const fileKey = generateKeyByFilename(filename)

    const fileTypeResult = await FileType.fromFile(file.path)

    const fileExtension = fileTypeResult?.ext as string
    const fileContentType = fileTypeResult?.mime as string

    const fileUrl = await this.storageProvider.uploadFile({
      fileKey,
      filePath,
      fileContentType
    })

    const urlValidity = new Date()
    addHours(urlValidity, 23)

    const fileCreated = await this.filesRepository.create({
      urlValidity,
      key: fileKey,
      url: fileUrl,
      size: fileSize,
      name: filename,
      extension: fileExtension,
      contentType: fileContentType
    })

    unlinkSync(filePath)

    return fileCreated
  }
}
