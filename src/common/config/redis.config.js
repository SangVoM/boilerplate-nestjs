"use strict";
exports.__esModule = true;
exports["default"] = (function () { return ({
    REDIS: {
        HOST: process.env.REDIS_HOST || 'localhost',
        PORT: parseInt(process.env.REDIS_PORTE, 10) || 6379,
        PASSWORD: process.env.REDIS_PASSWORD || 'redis'
    }
}); });
