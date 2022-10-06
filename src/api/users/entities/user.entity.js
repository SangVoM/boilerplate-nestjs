"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var class_transformer_1 = require("class-transformer");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ length: 30, required: true })
    ], User.prototype, "firstName");
    __decorate([
        (0, mongoose_1.Prop)({ length: 30, required: true })
    ], User.prototype, "lastName");
    __decorate([
        (0, mongoose_1.Prop)({ length: 50, unique: true, required: true })
    ], User.prototype, "email");
    __decorate([
        (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
        (0, mongoose_1.Prop)({ required: true })
    ], User.prototype, "password");
    __decorate([
        (0, mongoose_1.Prop)({ length: 20 })
    ], User.prototype, "phone");
    __decorate([
        (0, class_transformer_1.Exclude)(),
        (0, mongoose_1.Prop)({ "default": false })
    ], User.prototype, "delete");
    __decorate([
        (0, mongoose_1.Prop)()
    ], User.prototype, "refreshToken");
    __decorate([
        (0, mongoose_1.Prop)({ type: Date })
    ], User.prototype, "createdAt");
    __decorate([
        (0, mongoose_1.Prop)({ type: Date })
    ], User.prototype, "updatedAt");
    User = __decorate([
        (0, mongoose_1.Schema)()
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
