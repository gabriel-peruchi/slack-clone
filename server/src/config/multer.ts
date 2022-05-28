import { Options, diskStorage } from 'multer'
import path from 'path'

const uploadFolderPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

export default {
  dest: uploadFolderPath,

  storage: diskStorage({
    destination: uploadFolderPath
  }),

  limits: {
    fileSize: 3 * 1024 * 1024
  },

  fileFilter: (request, file, callback) => {
    callback(null, true)
  }
} as Options
