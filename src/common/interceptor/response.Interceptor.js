"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResponseInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var ResponseInterceptor = /** @class */ (function () {
    function ResponseInterceptor() {
    }
    ResponseInterceptor.prototype.intercept = function (context, next) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return next.handle().pipe((0, operators_1.map)(function (data) { return ({
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: data === null || data === void 0 ? void 0 : data.message,
            data: {
                result: data === null || data === void 0 ? void 0 : data.result,
                meta: data === null || data === void 0 ? void 0 : data.meta
            }
        }); }));
    };
    ResponseInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], ResponseInterceptor);
    return ResponseInterceptor;
}());
exports.ResponseInterceptor = ResponseInterceptor;
