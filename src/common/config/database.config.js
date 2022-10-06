"use strict";
exports.__esModule = true;
exports["default"] = (function () { return ({
    DB: {
        DB_CONNECTION: process.env.DB_CONNECTION || 'postgres',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: parseInt(process.env.DB_PORT, 10) || 3306,
        DB_DATABASE: process.env.DB_DATABASE || 'nest',
        DB_SCHEMA: process.env.DB_SCHEMA || 'nest_schema',
        DB_USERNAME: process.env.DB_USERNAME || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || 'root',
        DB_LOGGING: process.env.DB_LOGGING || 'all',
        DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true' || false
    }
}); });
