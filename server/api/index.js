import { Router } from 'express'

import users from './users'
import projects from './projects'

const router = Router()

router.use(users)
router.use(projects)

export default router
