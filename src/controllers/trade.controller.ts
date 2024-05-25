import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import Trade from '../models/trade'
import csv from 'csv-parser'

const uploadTradeData = async (req: any, res: Response, next: NextFunction) => {
  const filePath = req.file?.path

  if (!filePath) {
    return res.status(400).send('File not provided')
  }

  const trades: any[] = []

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      console.log(row, '---row')
      const [baseCoin, quoteCoin] = row.Market.split('/')
      trades.push({
        utcTime: new Date(row.UTC_Time),
        operation: row.Operation,
        market: row.Market,
        baseCoin,
        quoteCoin,
        amount: parseFloat(row['Buy/Sell Amount']),
        price: parseFloat(row.Price),
      })
    })
    .on('end', async () => {
      try {
        await Trade.insertMany(trades)
        fs.unlinkSync(filePath) // Clean up the uploaded file
        res.send('CSV data successfully uploaded and stored in the database')
      } catch (error) {
        console.log(error)
        res.status(500).send('Error storing data')
      }
    })
    .on('error', (error) => {
      res.status(500).send('Error reading CSV file')
    })
}

export default {
  uploadTradeData,
}
