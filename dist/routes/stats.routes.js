"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_controller_1 = __importDefault(require("../controllers/stats.controller"));
const router = (0, express_1.Router)();
// define routes
router.post('/get-balance', stats_controller_1.default.getBalance);
exports.default = router;
