import { Router } from 'express'
import statsController from '../controllers/stats.controller'

const router = Router()

// define routes
router.post('/get-balance', statsController.getBalance)

export default router
