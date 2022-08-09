"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.checkResetPassword = exports.forgotPassword = exports.logout = exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_service_2 = require("../services/auth.service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_service_1.loginService)(req, res);
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_service_1.logoutService)(req, res);
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_service_2.forgetPasswordService)(req, res);
});
exports.forgotPassword = forgotPassword;
const checkResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_service_2.checkResetPasswordService)(req, res);
});
exports.checkResetPassword = checkResetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_service_2.resetPasswordService)(req, res);
});
exports.resetPassword = resetPassword;
