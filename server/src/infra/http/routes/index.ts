import { Router } from 'express'

import { authRouter } from './auth.routes'
import { conversationRouter } from './conversations.routes'
import { fileRouter } from './files.routes'
import { organizationsRouter } from './organizations.routes'
import { userRouter } from './users.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/files', fileRouter)
router.use('/users', userRouter)
router.use('/organizations', organizationsRouter)
router.use('/conversations', conversationRouter)

export { router }
