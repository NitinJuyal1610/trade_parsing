import { Router } from 'express'
import tradeController from '../controllers/trade.controller'
import multer from 'multer'

const router = Router()
const upload = multer({ dest: 'uploads/' })

// define routes
router.post('/upload', upload.single('file'), tradeController.uploadTradeData)

export default router
