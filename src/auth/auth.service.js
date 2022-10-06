"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var check_password_util_1 = require("../util/check-password.util");
/**
 * Authentication Service
 */
var AuthService = /** @class */ (function () {
    function AuthService(configService, usersService, hashBcrypt) {
        this.configService = configService;
        this.usersService = usersService;
        this.hashBcrypt = hashBcrypt;
    }
    AuthService.prototype.register = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateRegister(payload.email, payload.password, payload.confirmPassword)];
                    case 1:
                        _a.sent();
                        payload.password = this.hashBcrypt.hashPassword(payload.password);
                        payload.email = payload.email.toLowerCase();
                        return [4 /*yield*/, this.usersService.create(payload)];
                    case 2:
                        newUser = _a.sent();
                        token = this.hashBcrypt.createTokenAndRefreshToken(newUser._id).token;
                        return [2 /*return*/, token];
                }
            });
        });
    };
    AuthService.prototype.login = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var getUser, _a, token, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.usersService.findOneEmail(payload.email)];
                    case 1:
                        getUser = _b.sent();
                        return [4 /*yield*/, this.validateLogin(getUser, payload.email, payload.password)];
                    case 2:
                        _b.sent();
                        _a = this.hashBcrypt.createTokenAndRefreshToken(getUser._id), token = _a.token, refreshToken = _a.refreshToken;
                        return [4 /*yield*/, this.hashBcrypt.handleSaveUserRefreshToken(getUser, refreshToken)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { token: token, refreshToken: refreshToken }];
                }
            });
        });
    };
    AuthService.prototype.validateLogin = function (getUser, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var comparePassword;
            return __generator(this, function (_a) {
                if (!getUser) {
                    throw new common_1.UnauthorizedException('login-error');
                }
                if (!(0, check_password_util_1["default"])(password)) {
                    throw new common_1.BadRequestException('password-error');
                }
                comparePassword = this.hashBcrypt.comparePassword(password, getUser.password);
                if (!comparePassword) {
                    throw new common_1.UnauthorizedException('login-error');
                }
                return [2 /*return*/];
            });
        });
    };
    AuthService.prototype.validateRegister = function (email, password, confirmPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var getEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findOneEmail(email)];
                    case 1:
                        getEmail = _a.sent();
                        if (getEmail) {
                            throw new common_1.BadRequestException('email-already');
                        }
                        if (!(0, check_password_util_1["default"])(password)) {
                            throw new common_1.BadRequestException('password-error');
                        }
                        if (password !== confirmPassword) {
                            throw new common_1.BadRequestException('password-not-match-confirm-password');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
