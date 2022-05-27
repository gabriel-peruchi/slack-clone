import { Router } from 'express'

import { authRouter } from './auth.routes'
import { organizationsRouter } from './organizations.routes'
import { userRouter } from './users.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/organizations', organizationsRouter)

export { router }
