import { Router } from 'express'

import users from './users'
import projects from './projects'
import classes from './classes'
import attempts from './attempts'
import features from './features'

const router = Router()

router.use(users)
router.use(projects)
router.use(classes)
router.use(attempts)
router.use(features)

export default router
