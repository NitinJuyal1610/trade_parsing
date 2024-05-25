"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trade_1 = __importDefault(require("../models/trade"));
const getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { timestamp } = req.body;
    // of form 2022-09-27 12:00:00
    const targetDate = new Date(timestamp);
    console.log(targetDate, '-');
    if (isNaN(targetDate.getTime())) {
        return res.status(400).send('Invalid timestamp');
    }
    try {
        // aggregate
        const trades = yield trade_1.default.aggregate([
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
        ]);
        const result = trades.reduce((acc, curr) => {
            return Object.assign(Object.assign({}, acc), { [curr.baseCoin]: curr.balance });
        }, {});
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send('Error calculating balances');
    }
});
exports.default = {
    getBalance,
};
