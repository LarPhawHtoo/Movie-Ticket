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
exports.findByIdService = exports.deleteMovieService = exports.updateMovieService = exports.findMovieService = exports.createMovieService = exports.getMovieService = void 0;
const movie_model_1 = __importDefault(require("../models/movie.model"));
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils/utils");
/**
 * get movie service.
 * @param _req
 * @param res
 * @param next
 */
const getMovieService = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = _req.query.page || 0;
        const moviesPerPage = _req.query.pageSize || 6;
        const userType = _req.headers['userType'];
        const userId = _req.headers['userId'];
        let condition = { deleted_at: null };
        if (userType === "User") {
            condition.created_user_id = userId;
            condition.updated_user_id = userId;
        }
        const movies = yield movie_model_1.default.find(condition).skip(page * moviesPerPage).limit(moviesPerPage);
        res.json({ data: movies, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.getMovieService = getMovieService;
/**
 * create post service
 * @param req
 * @param res
 * @param next
 */
const createMovieService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const movieTdo = {
            movie_id: req.body.movie_id,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating,
            cinema_id: req.body.cinema_id,
            time: req.body.time,
            profile: profile,
            created_user_id: req.body.created_user_id,
        };
        const movie = new movie_model_1.default(movieTdo);
        const result = yield movie.save();
        res
            .status(201)
            .json({ message: "Created Movie Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createMovieService = createMovieService;
const findMovieService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movie_model_1.default.findById(req.params.id);
        if (!movie) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ data: movie, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findMovieService = findMovieService;
const updateMovieService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        const movie = yield movie_model_1.default.findById(req.params.id);
        if (!movie) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        let profile = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
            if (movie.profile && movie.profile != profile) {
                (0, utils_1.deleteFile)(movie.profile);
            }
            if (profile) {
                movie.profile = profile;
            }
        }
        movie.code = req.body.code;
        movie.name = req.body.name;
        movie.year = req.body.year;
        movie.rating = req.body.rating;
        movie.created_user_id = req.body.created_user_id;
        movie.updated_user_id = req.body.updated_user_id;
        const result = yield movie.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateMovieService = updateMovieService;
const deleteMovieService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movie_model_1.default.findByIdAndRemove(req.params.id);
        if (!movie) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        movie.deleted_at = new Date();
        yield movie.save();
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteMovieService = deleteMovieService;
const findByIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 0;
        const moviesPerPage = req.query.ppp || 5;
        const userType = req.headers['userType'];
        const userId = req.headers['userId'];
        let condition = { userId: { '$regex': req.params.userId, '$options': 'i' }, deleted_at: null };
        if (userType === "User") {
            condition.created_user_id = userId;
        }
        const movies = yield movie_model_1.default.find(condition).skip(page * moviesPerPage).limit(moviesPerPage);
        res.json({ data: movies, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findByIdService = findByIdService;
