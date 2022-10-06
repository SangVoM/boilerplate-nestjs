"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var users_module_1 = require("@api/users/users.module");
var auth_controller_1 = require("./auth.controller");
var auth_service_1 = require("./auth.service");
var hash_bcrypt_1 = require("@common/bcrypt/hash.bcrypt");
var passport_1 = require("@nestjs/passport");
var jwt_strategy_1 = require("@common/jwt/jwt.strategy");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [users_module_1.UsersModule, passport_1.PassportModule],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, hash_bcrypt_1.HashBcrypt, jwt_strategy_1.JwtStrategy],
            exports: []
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
