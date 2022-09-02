"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
require("winston-daily-rotate-file");
exports.logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.DailyRotateFile({
            dirname: "logs",
            filename: "api-%DATE%.log",
            maxSize: '20m',
            maxFiles: '1d',
            format: winston_1.format.combine(winston_1.format.json()),
        }),
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(({ timestamp, level, message }) => {
                return `[${timestamp}] ${level}: ${message}`;
            })),
        }),
    ],
    format: winston_1.format.combine(winston_1.format.metadata(), winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
});
