"use strict";
exports.__esModule = true;
var app_config_1 = require("./app.config");
var database_config_1 = require("./database.config");
var redis_config_1 = require("./redis.config");
exports["default"] = [app_config_1["default"], database_config_1["default"], redis_config_1["default"]];
