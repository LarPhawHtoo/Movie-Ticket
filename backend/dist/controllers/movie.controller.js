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
exports.findById = exports.deleteMovie = exports.updateMovie = exports.findMovie = exports.createMovie = exports.nowShowing = exports.getMovies = void 0;
const movie_service_1 = require("../services/movie.service");
const getMovies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, movie_service_1.getMovieService)(req, res, next);
});
exports.getMovies = getMovies;
const nowShowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, movie_service_1.nowShowingService)(req, res, next);
});
exports.nowShowing = nowShowing;
const createMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, movie_service_1.createMovieService)(req, res, next);
});
exports.createMovie = createMovie;
const findMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, movie_service_1.findMovieService)(req, res, next);
});
exports.findMovie = findMovie;
const updateMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, movie_service_1.updateMovieService)(req, res, next);
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, movie_service_1.deleteMovieService)(req, res, next);
});
exports.deleteMovie = deleteMovie;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, movie_service_1.findByIdService)(req, res, next);
});
exports.findById = findById;
