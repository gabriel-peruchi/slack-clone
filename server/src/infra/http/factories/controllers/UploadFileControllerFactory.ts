import { UploadFileController } from '../../../../modules/files/controllers/UploadFileController'
import { FilesRepository } from '../../../../modules/files/repositories/FilesRepository'
import { UploadFile } from '../../../../modules/files/services/UploadFile'
import { StorageProvider } from '../../../providers/StorageProvider'

export function makeUploadFileController() {
  const storageProvider = new StorageProvider()
  const filesRepository = new FilesRepository()
  const uploadFile = new UploadFile(storageProvider, filesRepository)
  const uploadFileController = new UploadFileController(uploadFile)

  return uploadFileController
}
