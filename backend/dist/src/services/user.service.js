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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.findUserService = exports.createUserService = exports.getUserService = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../utils/utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const const_1 = require("../const/const");
const getUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 0;
        const usersPerPage = req.query.upp || 5;
        const userType = req.headers['userType'];
        const userId = req.headers['userId'];
        let condition = { deleted_at: null };
        if (userType === const_1.constData.userType) {
            condition.created_user_id = userId;
        }
        const users = yield user_model_1.default.find(condition).skip(page * usersPerPage).limit(usersPerPage);
        const result = [];
        for (let i = 0; i < users.length; i++) {
            const index = users.findIndex((dist) => users[i]._id.equals(dist._id));
            let username = "";
            index !== -1 ? username = users[index].fullName : "";
            let obj = Object.assign({}, users[i]._doc);
            result.push(obj);
        }
        res.json({
            data: result,
            status: 1,
            total: result.length,
            links: {
                self: req.originalUrl,
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserService = getUserService;
const createUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        let profile = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
        }
        const userTdo = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: yield bcrypt_1.default.hash(req.body.password, 12),
            type: req.body.type,
            phone: req.body.phone,
            dob: req.body.dob,
            address: req.body.address,
            profile: profile,
            created_user_id: req.body.created_user_id,
        };
        const user = new user_model_1.default(userTdo);
        const result = yield user.save();
        res
            .status(201)
            .json({ message: "Created User Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createUserService = createUserService;
const findUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (!user) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ data: user, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findUserService = findUserService;
const updateUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const user = yield user_model_1.default.findById(req.params.id);
        if (!user) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        let profile = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
            if (user.profile && user.profile != profile) {
                (0, utils_1.deleteFile)(user.profile);
            }
            if (profile) {
                user.profile = profile;
            }
        }
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.type = req.body.type;
        user.phone = req.body.phone;
        user.dob = req.body.dob;
        user.address = req.body.address;
        user.created_user_id = req.body.created_user_id;
        user.updated_user_id = req.body.updated_user_id;
        const result = yield user.save();
        res.json({ message: "Updated User Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findByIdAndRemove(req.params.id);
        if (!user) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        user.deleted_at = new Date();
        const result = yield user.save();
        res.json({ message: "Delete User Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUserService = deleteUserService;
