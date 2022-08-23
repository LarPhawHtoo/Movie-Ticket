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
exports.changePassword = exports.deleteUser = exports.updateUser = exports.findUser = exports.createUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, user_service_1.getUserService)(req, res, next);
});
exports.getUsers = getUsers;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, user_service_1.createUserService)(req, res, next);
});
exports.createUser = createUser;
const findUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, user_service_1.findUserService)(req, res, next);
});
exports.findUser = findUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, user_service_1.updateUserService)(req, res, next);
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, user_service_1.deleteUserService)(req, res, next);
});
exports.deleteUser = deleteUser;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, user_service_1.passwordChangeService)(req, res, next);
});
exports.changePassword = changePassword;
