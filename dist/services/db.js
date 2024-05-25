"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../common/logger")); // to use env variables
require("../common/env");
const DB_URI = process.env.MONGO_URI || process.env.LOCAL_CONNECTION_STRING;
mongoose_1.default.connect(DB_URI);
mongoose_1.default.Promise = global.Promise;
// Get current connected Database
const db = mongoose_1.default.connection;
// Notify on error or success
db.on('error', (err) => logger_1.default.error('connection with db error', err));
db.on('close', () => logger_1.default.info('connection closed to db'));
db.once('open', () => logger_1.default.info(`Connected to the database instance on ${DB_URI}`));
exports.default = {
    Connection: db,
};
