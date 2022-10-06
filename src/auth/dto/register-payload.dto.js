"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterPayloadDto = void 0;
var class_validator_1 = require("class-validator");
var RegisterPayloadDto = /** @class */ (function () {
    function RegisterPayloadDto() {
    }
    __decorate([
        (0, class_validator_1.Length)(1, 30, { message: 'first-name-length-1-30' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'first-name-not-empty' })
    ], RegisterPayloadDto.prototype, "firstName");
    __decorate([
        (0, class_validator_1.Length)(1, 30, { message: 'first-name-length-1-30' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'first-name-not-empty' })
    ], RegisterPayloadDto.prototype, "lastName");
    __decorate([
        (0, class_validator_1.Length)(1, 50, { message: 'email-length-1-50' }),
        (0, class_validator_1.IsEmail)({}, { message: 'email-is-email' })
    ], RegisterPayloadDto.prototype, "email");
    __decorate([
        (0, class_validator_1.Length)(8, 20, { message: 'password-length-8-20' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'password-not-empty' })
    ], RegisterPayloadDto.prototype, "password");
    __decorate([
        (0, class_validator_1.Length)(8, 20, { message: 'confirm-password-length-8-20' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'confirm-password-not-empty' })
    ], RegisterPayloadDto.prototype, "confirmPassword");
    __decorate([
        (0, class_validator_1.Length)(10, 20, { message: 'phone-length-8-20' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'phone-not-empty' })
    ], RegisterPayloadDto.prototype, "phone");
    return RegisterPayloadDto;
}());
exports.RegisterPayloadDto = RegisterPayloadDto;
