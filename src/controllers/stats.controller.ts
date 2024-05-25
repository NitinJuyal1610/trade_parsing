import { Request, Response, NextFunction } from 'express'
import Trade from '../models/trade'
import BalanceRequest from '../interfaces/balance-request.interface'

const getBalance = async (req: Request, res: Response) => {
  const { timestamp }: BalanceRequest = req.body

  // of form 2022-09-27 12:00:00

  const targetDate = new Date(timestamp)

  console.log(targetDate, '-')
  if (isNaN(targetDate.getTime())) {
    return res.status(400).send('Invalid timestamp')
  }

  try {
    // aggregate

    const trades = await Trade.aggregate([
      {
        $match: {
          utcTime: {
            //time less than or eq to target date
            $lte: targetDate,
          },
        },
      },
      {
        $group: {
          _id: '$baseCoin',
          balance: {
            $sum: {
              // if buy then add amount, if sell then subtract amount
              $cond: [{ $eq: ['$operation', 'Buy'] }, '$amount', { $multiply: ['$amount', -1] }],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          baseCoin: '$_id',
          balance: 1,
        },
      },
    ])
    const result = trades.reduce((acc, curr) => {
      return { ...acc, [curr.baseCoin]: curr.balance }
    }, {})
    return res.status(200).send(result)
  } catch (error) {
    res.status(500).send('Error calculating balances')
  }
}

export default {
  getBalance,
}
