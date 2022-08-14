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
exports.logoutService = exports.loginService = exports.resetPasswordService = exports.checkResetPasswordService = exports.forgetPasswordService = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_2 = __importDefault(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = __importDefault(require("../models/user.model"));
const password_reset_1 = __importDefault(require("../models/password.reset"));
const sendEmail_1 = require("../utils/sendEmail");
const loginService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_model_1.default.findOne({ email: req.body.email }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Could not find user'
            });
        }
        if (!(0, bcrypt_1.compareSync)(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect Password'
            });
        }
        const payload = {
            email: yield bcrypt_2.default.hash(user.email, 12),
            id: yield bcrypt_2.default.hash(user.id, 12)
        };
        const token = jsonwebtoken_1.default.sign(payload, 'secrect', { expiresIn: '1d' });
        return res.status(200).send({
            success: true,
            message: 'Login Successfully!',
            users: user,
            token: token
        });
    }));
});
exports.loginService = loginService;
const logoutService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    return res.json({ "message": "Logout Successfully" });
});
exports.logoutService = logoutService;
const forgetPasswordService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send("Email does not exist");
        let token = yield password_reset_1.default.findOne({ userId: user._id });
        if (!token) {
            token = yield new password_reset_1.default({
                email: req.body.email,
                token: crypto_1.default.randomBytes(16).toString("hex"),
            }).save();
        }
        const link = `${process.env.BASE_URL}/forget-password-update/${user._id}/${token.token}`;
        yield (0, sendEmail_1.sendEmail)(user.email, "Password reset", link);
        res.status(200).json({
            message: "Password reset link sent to your email account"
        });
    }
    catch (error) {
        res.send("An error occured");
    }
});
exports.forgetPasswordService = forgetPasswordService;
const checkResetPasswordService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.userId);
        if (!user)
            return res.status(401).send("Invalid link or expired");
        const token = yield password_reset_1.default.findOne({
            email: user.email,
            token: req.params.token,
            createdAt: { $gte: (0, moment_1.default)().subtract(1, 'hours').utc() }
        });
        if (!token)
            return res.status(401).send("Invalid link or expired");
        user.password = yield bcrypt_2.default.hash(req.body.password, 12);
        //user.password = req.body.password;
        yield user.save();
        res.json({
            message: "Forget password sucessfully."
        });
    }
    catch (error) {
        res.send("An error occured");
    }
});
exports.checkResetPasswordService = checkResetPasswordService;
const resetPasswordService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.userId);
        if (!user)
            return res.status(401).send("User Id does not exist");
        const passwordReset = yield password_reset_1.default.findOne({
            token: req.params.token
        });
        if (!passwordReset)
            return res.status(401).send("Invalid link or expired");
        console.log(req.body.password);
        user.password = yield bcrypt_2.default.hash(req.body.password, 12);
        yield user.save();
        yield passwordReset.delete();
        res.json({
            message: "Password reset sucessfully."
        });
    }
    catch (error) {
        res.send("An error occured");
    }
});
exports.resetPasswordService = resetPasswordService;
