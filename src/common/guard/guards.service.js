"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServiceGuard = void 0;
var common_1 = require("@nestjs/common");
var ServiceGuard = /** @class */ (function () {
    function ServiceGuard() {
    }
    ServiceGuard.prototype.canActivate = function (context) {
        var request = context.switchToHttp().getRequest();
        console.log('request: ', request);
        var customer = request.user;
        if (customer) {
            return true;
        }
        throw new common_1.UnauthorizedException('unauthorized-access');
    };
    ServiceGuard = __decorate([
        (0, common_1.Injectable)()
    ], ServiceGuard);
    return ServiceGuard;
}());
exports.ServiceGuard = ServiceGuard;
