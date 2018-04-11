import { Router } from 'express'

import users from './users'
import projects from './projects'
import classes from './classes'

const router = Router()

router.use(users)
router.use(projects)
router.use(classes)

export default router
