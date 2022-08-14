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
exports.updateAvalability = exports.getCinemaAvailability = exports.getCinemas = exports.getMovies = void 0;
//import { setFlagsFromString } from 'v8';
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const movie_model_1 = __importDefault(require("../models/movie.model"));
const ticket_1 = require("../interfaces/ticket");
//get all movies
//export const getMovies = async (): Promise<Array<MoviesInterface>> => {
//  const movies: any= mongodbClient.db('Movie-Ticket').collection('movies').find();
//  const moviesArray: Array<MoviesInterface> = await movies.toArray();
//  return moviesArray;
//}
const getMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const movies = movie_model_1.default.find();
    const moviesArray = yield movies.toArray();
    return moviesArray;
});
exports.getMovies = getMovies;
//get all cinema
//export const getCinemas = async (): Promise<Array<string>> => {
//  const bookings:any= mongodbClient.db('Movie-Ticket').collection('bookings').find();
//  const cinemasArray: Array<CinemasInterface> = await bookings.toArray();
//  const resultArray: Array<string> = [];
//  cinemasArray.forEach((item) => resultArray.push(item.cinema_name));
//  return resultArray;
//}
const getCinemas = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = ticket_model_1.default.find();
    const cinemasArray = yield bookings.toArray();
    const resultArray = [];
    cinemasArray.forEach((item) => resultArray.push(item.cinema_name));
    return resultArray;
});
exports.getCinemas = getCinemas;
//get seat availabilities at a cinema for a movie
const getCinemaAvailability = (cinemaName, movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const cinemaAvailability = yield ticket_model_1.default.findOne({ cinema_name: cinemaName });
    if (cinemaAvailability) {
        const cinemaAndMovieSelection = cinemaAvailability.bookings.filter((item) => item.movie_id == movieId);
        return cinemaAndMovieSelection[0].seats;
    }
    //throw new Error();
});
exports.getCinemaAvailability = getCinemaAvailability;
//update seat availability for a movie at a cinema
const updateAvalability = (cinemaName, movieId, seatNumbers, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const cinemaAvailability = yield ticket_model_1.default.findOne({ cinema_name: cinemaName });
    if (cinemaAvailability) {
        cinemaAvailability.bookings.forEach((item) => {
            if (item.movie_id == movieId) {
                seatNumbers.forEach((seatNumber) => {
                    item.seats.forEach((seats) => {
                        if (seatNumber == seats.seat_number) {
                            seats.status = ticket_1.SeatAvailability[newStatus];
                        }
                    });
                });
            }
        });
        const updateResult = yield ticket_model_1.default.updateOne({ cinema_name: cinemaName }, {
            $set: {
                bookings: cinemaAvailability.bookings
            }
        });
        if (updateResult) {
            return "Booking updated successfully";
        }
    }
    //throw new Error();
});
exports.updateAvalability = updateAvalability;
