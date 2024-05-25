import mongoose, { Document, Schema } from 'mongoose'

import ITrade from '../interfaces/itrade.interface'
const tradeSchema: Schema = new Schema({
  utcTime: {
    type: Date,
    required: true,
    index: true,
  },
  operation: {
    type: String,
    enum: ['Buy', 'Sell'],
    required: true,
  },
  market: {
    type: String,
    required: true,
  },
  baseCoin: {
    type: String,
    required: true,
  },
  quoteCoin: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

const Trade = mongoose.model<ITrade>('Trade', tradeSchema)

export default Trade
