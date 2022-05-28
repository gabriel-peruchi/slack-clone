import { Router } from 'express'
import multer from 'multer'

import multerConfig from '../../../config/multer'
import { makeUploadFileController } from '../factories/controllers/UploadFileControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const uploadMulter = multer(multerConfig)
const uploadFileController = makeUploadFileController()
const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()

const fileRouter = Router()

fileRouter.post(
  '/upload',
  (...req) => ensureAuthenticatedMiddleware.handle(...req),
  uploadMulter.single('file'),
  uploadFileController.handle.bind(uploadFileController)
)

export { fileRouter }
