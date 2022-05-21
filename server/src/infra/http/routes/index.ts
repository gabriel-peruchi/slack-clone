import { Router } from 'express'

import { authRouter } from './auth.routes'
import { organizationsRouter } from './organizations.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/organizations', organizationsRouter)

export { router }
