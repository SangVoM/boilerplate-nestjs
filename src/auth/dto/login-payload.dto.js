"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginPayloadDto = void 0;
var class_validator_1 = require("class-validator");
var LoginPayloadDto = /** @class */ (function () {
    function LoginPayloadDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'email-not-empty' })
    ], LoginPayloadDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'password-not-empty' }),
        (0, class_validator_1.MinLength)(8, { message: 'min-length-8' })
    ], LoginPayloadDto.prototype, "password");
    return LoginPayloadDto;
}());
exports.LoginPayloadDto = LoginPayloadDto;
