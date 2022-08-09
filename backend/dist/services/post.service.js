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
exports.findByNameService = exports.deletePostService = exports.updatePostService = exports.findPostService = exports.createPostService = exports.getPostService = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const express_validator_1 = require("express-validator");
/**
 * get post service.
 * @param _req
 * @param res
 * @param next
 */
const getPostService = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = _req.query.page || 0;
        const postsPerPage = _req.query.ppp || 5;
        const userType = _req.headers['userType'];
        const userId = _req.headers['userId'];
        let condition = { deleted_at: null };
        if (userType === "User") {
            condition.created_user_id = userId;
            condition.updated_user_id = userId;
        }
        const posts = yield post_model_1.default.find(condition).skip(page * postsPerPage).limit(postsPerPage);
        res.json({ data: posts, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.getPostService = getPostService;
/**
 * create post service
 * @param req
 * @param res
 * @param next
 */
const createPostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const postList = req.body;
        const result = yield post_model_1.default.insertMany(postList);
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createPostService = createPostService;
const findPostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        if (!post) {
            const error = Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        res.json({ data: post, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findPostService = findPostService;
const updatePostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const post = yield post_model_1.default.findById(req.params.id);
        if (!post) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        post.title = req.body.title;
        post.description = req.body.description;
        post.status = req.body.status;
        post.created_user_id = req.body.created_user_id;
        post.updated_user_id = req.body.updated_user_id;
        const result = yield post.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updatePostService = updatePostService;
const deletePostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        if (!post) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        post.deleted_at = new Date();
        yield post.save();
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.deletePostService = deletePostService;
const findByNameService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 0;
        const postsPerPage = req.query.ppp || 5;
        const userType = req.headers['userType'];
        const userId = req.headers['userId'];
        let condition = { title: { '$regex': req.body.title, '$options': 'i' }, deleted_at: null };
        if (userType === "User") {
            condition.created_user_id = userId;
        }
        const posts = yield post_model_1.default.find(condition).skip(page * postsPerPage).limit(postsPerPage);
        res.json({ data: posts, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findByNameService = findByNameService;
