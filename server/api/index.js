import { Router } from 'express'

import users from './users'
import projects from './projects'
import classes from './classes'
import attempts from './attempts'
import features from './features'
import models from './models'

const router = Router()

router.use(users)
router.use(projects)
router.use(classes)
router.use(attempts)
router.use(features)
router.use(models)

export default router
