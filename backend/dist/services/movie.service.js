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
exports.findByIdService = exports.deleteMovieService = exports.updateMovieService = exports.findMovieService = exports.nowShowingService = exports.createMovieService = exports.getMovieService = void 0;
const movie_model_1 = __importDefault(require("../models/movie.model"));
const cinema_model_1 = __importDefault(require("../models/cinema.model"));
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils/utils");
const logger_1 = require("../logger/logger");
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
            logger_1.logger.error("Movie not found");
        }
        res.json({
            success: true,
            message: "Movies fetched",
            movies: movies,
            status: 1,
        });
        logger_1.logger.info("Successfully fetched movies");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error fetching movies");
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
            logger_1.logger.error("Validation failed");
        }
        let image = req.body.image;
        if (req.files.image.length > 0) {
            image = req.files.image[0].path.replaceAll("\\", "/");
        }
        const movieTdo = {
            code: req.body.code,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating,
            cinema_id: req.body.cinema_id,
            time: req.body.time,
            status: req.body.status,
            image: image,
            created_user_id: req.body.created_user_id,
        };
        const movie = new movie_model_1.default(movieTdo);
        const result = yield movie.save();
        res
            .status(201)
            .json({ message: "Created Movie Successfully!", movies: result, status: 1 });
        logger_1.logger.info("Movie created successfully");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error creating Movie");
    }
});
exports.createMovieService = createMovieService;
const nowShowingService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield cinema_model_1.default.find();
        const movies = yield movie_model_1.default.find({ deleted_at: null });
        //console.log(movies);
        if (!movies) {
            res.json({
                success: false,
                message: "Not found movie",
            });
        }
        var show = "Now Showing";
        var resultStatus = [];
        for (let i = 0; i < movies.length; i++) {
            let data = {
                movieStatus: movies[i].status,
                cinema_name: movies[i].cinema_id,
                time: movies[i].time,
                movieName: movies[i].name,
                image: movies[i].image,
            };
            if (data.movieStatus == show) {
                resultStatus.push(data);
            }
        }
        console.log(resultStatus);
        res.json({
            message: "Now Showing Movies",
            movies: resultStatus,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.nowShowingService = nowShowingService;
const findMovieService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movie_model_1.default.findById(req.params.id);
        if (!movie) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Not Found!");
        }
        res.json({ movies: movie, status: 1 });
        logger_1.logger.info("Successfully found movie!");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error finding movie!");
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
            logger_1.logger.error("Validation failed");
        }
        const movie = yield movie_model_1.default.findById(req.params.id);
        if (!movie) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Not Found!");
        }
        let image = req.body.image;
        if (req.files.image.length > 0) {
            image = req.files.image[0].path.replace("\\", "/");
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
        movie.time = req.body.time;
        movie.status = req.body.status;
        movie.created_user_id = req.body.created_user_id;
        movie.updated_user_id = req.body.updated_user_id;
        const result = yield movie.save();
        res.json({ message: "Updated Successfully!", movies: result, status: 1 });
        logger_1.logger.info("Movie Updated Successfully");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error updating movie");
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
            logger_1.logger.error("Not Found!");
        }
        res.json({
            message: "Delete Movie Successfully!",
            movies: movie,
            status: 1,
        });
        logger_1.logger.info("Movie deleted successfully");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error deleting Movie");
    }
});
exports.deleteMovieService = deleteMovieService;
const findByIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_model_1.default.findById(req.params.id);
        res.json({ movies: movies, status: 1 });
        logger_1.logger.info("Movie found successfully");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error finding movie");
    }
});
exports.findByIdService = findByIdService;
