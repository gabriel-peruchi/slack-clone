import { S3 } from 'aws-sdk'
import * as fs from 'fs'

import amazonS3Config from '../../config/amazonS3'
import { AppError } from '../../core/errors/AppError'

type UploadParams = {
  fileKey: string
  filePath: string
  fileContentType: string
}

export class StorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      accessKeyId: amazonS3Config.accessKeyId,
      secretAccessKey: amazonS3Config.secretAccessKey,
      region: amazonS3Config.region
    })
  }

  async uploadFile({ fileKey, filePath, fileContentType }: UploadParams) {
    if (!fileKey) {
      throw new AppError('Chave não informada.')
    }

    if (!fileContentType) {
      throw new AppError('Tipo do arquivo não informado.')
    }

    const fileContent = fs.readFileSync(filePath)

    if (!fileContent) {
      throw new AppError('Arquivo não encontrado.')
    }

    const uploadParams: S3.PutObjectRequest = {
      Key: fileKey,
      Body: fileContent,
      ContentType: fileContentType,
      Bucket: amazonS3Config.bucket
    }

    await this.client.upload(uploadParams).promise()
    return await this.getPublicUrlFile(fileKey)
  }

  async getPublicUrlFile(fileKey: string, expiresInSeconds = 86400) {
    const params = {
      Bucket: amazonS3Config.bucket,
      Key: fileKey,
      Expires: expiresInSeconds
    }

    return await this.client.getSignedUrlPromise('getObject', params)
  }
}
