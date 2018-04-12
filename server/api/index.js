import { Router } from 'express'

import users from './users'
import projects from './projects'
import classes from './classes'
import attempts from './attempts'

const router = Router()

router.use(users)
router.use(projects)
router.use(classes)
router.use(attempts)

export default router
