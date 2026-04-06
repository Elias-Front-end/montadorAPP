import { Router } from 'express'
import { authRouter } from './modules/auth/auth.router'
import { usersRouter } from './modules/users/users.router'
import { servicesRouter } from './modules/services/services.router'
import { evaluationsRouter } from './modules/evaluations/evaluations.router'
import { calendarRouter } from './modules/calendar/calendar.router'
import { materialsRouter } from './modules/materials/materials.router'
import { adminRouter } from './modules/admin/admin.router'

export const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/services', servicesRouter)
router.use('/evaluations', evaluationsRouter)
router.use('/calendar', calendarRouter)
router.use('/materials', materialsRouter)
router.use('/admin', adminRouter)

router.get('/', (_, res) => {
  res.json({
    name: 'Montador Conecta API',
    version: '1.0.0',
    docs: '/api/v1/docs'
  })
})
})
