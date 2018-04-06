import { Router } from 'express'

import users from './users'
import projects from './projects'
import login from './login'

const router = Router()

router.use(users)
router.use(projects)
router.use(login)

export default router
