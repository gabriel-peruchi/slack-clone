import { Schema, model } from 'mongoose'

import { File } from '../../../modules/files/domain/File'

const FileSchema = new Schema<File>(
  {
    name: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    extension: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    urlValidity: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

const FileModel = model<File>('File', FileSchema, 'files')

export { FileModel }
