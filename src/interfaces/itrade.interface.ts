import { Document } from 'mongoose'

interface ITrade extends Document {
  utcTime: Date
  operation: 'BUY' | 'SELL'
  market: string
  baseCoin: string
  quoteCoin: string
  amount: number
  price: number
}

export default ITrade
