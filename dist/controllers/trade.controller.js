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
const fs_1 = __importDefault(require("fs"));
const trade_1 = __importDefault(require("../models/trade"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const uploadTradeData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (!filePath) {
        return res.status(400).send('File not provided');
    }
    const trades = [];
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on('data', (row) => {
        console.log(row, '---row');
        const [baseCoin, quoteCoin] = row.Market.split('/');
        trades.push({
            utcTime: new Date(row.UTC_Time),
            operation: row.Operation,
            market: row.Market,
            baseCoin,
            quoteCoin,
            amount: parseFloat(row['Buy/Sell Amount']),
            price: parseFloat(row.Price),
        });
    })
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield trade_1.default.insertMany(trades);
            fs_1.default.unlinkSync(filePath); // Clean up the uploaded file
            res.send('CSV data successfully uploaded and stored in the database');
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Error storing data');
        }
    }))
        .on('error', (error) => {
        res.status(500).send('Error reading CSV file');
    });
});
exports.default = {
    uploadTradeData,
};
