"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var config_2 = require("./common/config");
var bull_1 = require("@nestjs/bull");
var mongoose_1 = require("@nestjs/mongoose");
var users_module_1 = require("./api/users/users.module");
var auth_module_1 = require("./auth/auth.module");
var core_1 = require("@nestjs/core");
var app_exceptions_filter_1 = require("./common/filter/app-exceptions.filter");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: config_2["default"]
                }),
                bull_1.BullModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        redis: {
                            host: configService.get('REDIS.HOST'),
                            port: configService.get('REDIS.PORT'),
                            password: configService.get('REDIS.PASSWORD'),
                            showFriendlyErrorStack: true
                        }
                    }); }
                }),
                mongoose_1.MongooseModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) {
                        var config = {
                            host: configService.get('DB.DB_HOST'),
                            port: configService.get('DB.DB_PORT'),
                            username: configService.get('DB.DB_USERNAME'),
                            password: configService.get('DB.DB_PASSWORD'),
                            database: configService.get('DB.DB_DATABASE')
                        };
                        return {
                            uri: "mongodb://".concat(config.username, ":").concat(config.password, "@").concat(config.host, ":").concat(config.port, "/").concat(config.database, "?authSource=admin"),
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        };
                    }
                }),
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
            ],
            controllers: [],
            providers: [
                {
                    provide: core_1.APP_FILTER,
                    useClass: app_exceptions_filter_1.AppExceptionsFilter
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
