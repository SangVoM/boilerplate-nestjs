"use strict";
exports.__esModule = true;
exports["default"] = (function () { return ({
    APP_URL: process.env.APP_URL || 'http://localhost',
    APP_HOST: process.env.APP_HOST || '127.0.0.1',
    APP_KEY: process.env.APP_KEY || 'C@12345%CP',
    APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
    APP_PREFIX: process.env.APP_PREFIX || '/api/v1',
    SECURITY_KEY_PREFIX: process.env.SECURITY_KEY_PREFIX || 'miharas246'
}); });
