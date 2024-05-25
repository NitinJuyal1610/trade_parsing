import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import statsRoutes from './routes/stats.routes'
import tradeRoutes from './routes/trade.routes'
import unknownEndpoint from './middlewares/unknownEndpoint'

// to use env variables
import './common/env'

const app: Application = express()

// middleware
app.disable('x-powered-by')
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  }),
)
app.use(express.json())

// health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    'health-check': 'OK: top level api working',
  })
})

app.use('/v1/stats', statsRoutes)
app.use('/v1/trade', tradeRoutes)

// Handle unknown endpoints
app.use('*', unknownEndpoint)

export default app
