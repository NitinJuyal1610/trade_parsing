import { Request, Response, NextFunction } from 'express'
import Trade from '../models/trade'
import BalanceRequest from '../interfaces/balance-request.interface'

const getBalance = async (req: Request, res: Response) => {
  const { timestamp }: BalanceRequest = req.body
  const targetDate = new Date(timestamp)

  if (isNaN(targetDate.getTime())) {
    return res.status(400).send('Invalid timestamp')
  }

  try {
    const trades = await Trade.find({ utcTime: { $lte: targetDate } })

    const balances = trades.reduce(
      (acc, trade) => {
        const { baseCoin, operation, amount } = trade
        if (!acc[baseCoin]) acc[baseCoin] = 0
        acc[baseCoin] += operation === 'BUY' ? amount : -amount
        return acc
      },
      {} as Record<string, number>,
    )

    res.json(balances)
  } catch (error) {
    res.status(500).send('Error calculating balances')
  }
}

export default {
  getBalance,
}
