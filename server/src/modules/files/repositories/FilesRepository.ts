import { FileModel } from '../../../infra/mongoose/models/FileModel'
import { File } from '../domain/File'

export class FilesRepository {
  async create(file: File): Promise<File> {
    const fileDoc = await FileModel.create(file)
    return fileDoc.toObject()
  }

  async findById(id: string): Promise<File | undefined> {
    const fileDoc = await FileModel.findById(id)
    return fileDoc?.toObject()
  }
}
