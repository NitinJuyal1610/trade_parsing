"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const stats_routes_1 = __importDefault(require("./routes/stats.routes"));
const trade_routes_1 = __importDefault(require("./routes/trade.routes"));
const unknownEndpoint_1 = __importDefault(require("./middlewares/unknownEndpoint"));
// to use env variables
require("./common/env");
const app = (0, express_1.default)();
// middleware
app.disable('x-powered-by');
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
}));
app.use(express_1.default.json());
// health check
app.get('/', (req, res) => {
    res.status(200).json({
        'health-check': 'OK: top level api working',
    });
});
app.use('/v1/stats', stats_routes_1.default);
app.use('/v1/trade', trade_routes_1.default);
// Handle unknown endpoints
app.use('*', unknownEndpoint_1.default);
exports.default = app;
