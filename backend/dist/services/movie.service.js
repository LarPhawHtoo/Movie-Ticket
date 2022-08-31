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
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'apiuploads/movies' });
/**
 * get movie service.
 * @param _req
 * @param res
 * @param next
 */
const getMovieService = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_model_1.default.find();
        if (!movies) {
            res.json({
                success: false,
                message: "Not Found! ",
            });
        }
        res.json({
            success: true,
            message: "Movies fetched",
            movies: movies,
            status: 1,
        });
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
        let profile = req.body.image;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
        }
        const movieTdo = {
            code: req.body.code,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating,
            cinema_id: req.body.cinema_id,
            time: req.body.time,
            date: req.body.date,
            //date: req.body.date,
            image: profile,
            created_user_id: req.body.created_user_id,
        };
        const movie = new movie_model_1.default(movieTdo);
        const result = yield movie.save();
        res
            .status(201)
            .json({ message: "Created Movie Successfully!", movies: result, status: 1 });
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
        res.json({ movies: movie, status: 1 });
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
        let image = req.body.image;
        if (req.file) {
            image = req.file.path.replace("\\", "/");
            if (movie.image && movie.image != image) {
                (0, utils_1.deleteFile)(movie.image);
            }
            if (image) {
                movie.image = image;
            }
        }
        movie.code = req.body.code;
        movie.name = req.body.name;
        movie.year = req.body.year;
        movie.rating = req.body.rating;
        movie.image = image;
        movie.created_user_id = req.body.created_user_id;
        movie.updated_user_id = req.body.updated_user_id;
        const result = yield movie.save();
        res.json({ message: "Updated Successfully!", movies: result, status: 1 });
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
        res.json({
            message: "Delete Movie Successfully!",
            movies: movie,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteMovieService = deleteMovieService;
const findByIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_model_1.default.findById(req.params.id);
        res.json({ movies: movies, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findByIdService = findByIdService;
