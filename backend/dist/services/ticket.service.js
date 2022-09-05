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
exports.getTicketByCinemaIdService = exports.getdashBoardService = exports.deleteTicketService = exports.updateTicketService = exports.findTicketService = exports.createTicketService = exports.getTicketService = void 0;
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const cinema_model_1 = __importDefault(require("../models/cinema.model"));
const seat_model_1 = __importDefault(require("../models/seat.model"));
const movie_model_1 = __importDefault(require("../models/movie.model"));
const express_validator_1 = require("express-validator");
const logger_1 = require("../logger/logger");
/**
 * get tickets service
 * @param _req
 * @param res
 * @param next
 */
const getTicketService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield ticket_model_1.default.find();
        if (!tickets) {
            res.json({
                success: false,
                message: "Not Found! ",
            });
            logger_1.logger.error("Tickets Not Found!");
        }
        var sortedTicket = tickets.sort((a, b) => a.seatNumber < b.seatNumber ? -1 : 1);
        res.json({
            success: true,
            message: "Tickets fetched",
            tickets: sortedTicket,
            status: 1,
        });
        logger_1.logger.info("Tickets fetched successfully");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error fetching tickets");
    }
});
exports.getTicketService = getTicketService;
/**
 * create ticket service
 * @param _req
 * @param res
 * @param next
 */
const createTicketService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Validation failed");
        }
        const ticketTdo = {
            customer_name: req.body.customer_name,
            cinema_id: req.body.cinema_id,
            movie_id: req.body.movie_id,
            seatNumber: req.body.seatNumber,
            price: req.body.price,
            status: req.body.status,
            date: req.body.date,
            time: req.body.time
        };
        const ticket = new ticket_model_1.default(ticketTdo);
        const result = yield ticket.save();
        res.status(201).json({
            message: "Created Ticket successfully!",
            tickets: result,
            status: 1,
        });
        logger_1.logger.info("Created Ticket successfully!");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Failed to create Ticket!");
    }
});
exports.createTicketService = createTicketService;
/**
 * find ticket service
 * @param req
 * @param res
 * @param next
 */
const findTicketService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_model_1.default.findById(req.params.id);
        console.log(ticket);
        if (!ticket) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Not Found Ticket!");
        }
        res.json({ tickets: ticket, status: 1 });
        logger_1.logger.info("Successfully found Ticket!");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error finding Ticket!");
    }
});
exports.findTicketService = findTicketService;
/**
 * Update ticket service
 * @param req
 * @param res
 * @param next
 */
const updateTicketService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Validation failed");
        }
        const ticket = yield ticket_model_1.default.findByIdAndUpdate(req.params.id);
        if (!ticket) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Not Found!");
        }
        ticket.customer_name = req.body.customer_name;
        ticket.cinema_id = req.body.cinema_id;
        ticket.movie_id = req.body.movie_id;
        ticket.seatNumber = req.body.seatNumber;
        ticket.price = req.body.price;
        ticket.status = req.body.status;
        ticket.date = req.body.date;
        ticket.time = req.body.time;
        const result = yield ticket.save();
        res.json({
            message: "Updated Ticket Successfully!",
            tickets: result,
            status: 1,
        });
        logger_1.logger.info("Updated Ticket Successfully!");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error updating Ticket");
    }
});
exports.updateTicketService = updateTicketService;
/**
 * delete ticket service
 * @param req
 * @param res
 * @param next
 */
const deleteTicketService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_model_1.default.findByIdAndRemove(req.params.id);
        if (!ticket) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Not Found Ticket");
        }
        res.json({
            message: "Delete Ticket Successfully!",
            tickets: ticket,
            status: 1,
        });
        logger_1.logger.info("Delete Ticket Successfully!");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Error deleting Ticket");
    }
});
exports.deleteTicketService = deleteTicketService;
/**
 * get getdashBoard by Movie Id service
 * @param req
 * @param res
 * @param next
 */
const getdashBoardService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield cinema_model_1.default.find();
        console.log(cinema);
        const ticket = yield ticket_model_1.default.find({ date: req.body.date });
        const movie = yield movie_model_1.default.find({ deleted_at: null });
        var resultMovie = [];
        for (let i = 0; i < movie.length; i++) {
            for (let j = 0; j < movie[i].time.length; j++) {
                let movieData = {
                    cinema_name: movie[i].cinema_id,
                    movieName: movie[i].name,
                    time: movie[i].time[j],
                    date: req.body.date,
                    image: movie[i].image,
                };
                // resultMovie.push(data);
                const seats = yield seat_model_1.default.find();
                let sold_out_seats = [];
                let available_seats = [];
                for (let i = 0; i < seats.length; i++) {
                    const filter = ticket.find((ticket) => { var _a; return ((_a = ticket.seatNumber) === null || _a === void 0 ? void 0 : _a.findIndex((number) => number === seats[i].seatNumber)) !== -1; });
                    if (filter && filter !== undefined) {
                        sold_out_seats.push(seats[i].seatNumber);
                    }
                    else {
                        available_seats.push(seats[i].seatNumber);
                    }
                }
                console.log(sold_out_seats);
                movieData['sold_out_seats'] = sold_out_seats;
                movieData['available_seats'] = available_seats;
                resultMovie.push(movieData);
            }
        }
        if (!resultMovie) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Not Found Ticket!");
        }
        res.json({ tickets: resultMovie, status: 1 });
        logger_1.logger.info("Successfully got tickets");
    }
    catch (err) {
        next(err);
    }
});
exports.getdashBoardService = getdashBoardService;
const getTicketByCinemaIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const cinema = yield cinema_model_1.default.findById(req.params.cinema_id);
        const tickets = yield ticket_model_1.default.find({ cinema_id: cinema === null || cinema === void 0 ? void 0 : cinema._id, date: (_a = req.body) === null || _a === void 0 ? void 0 : _a.date, time: (_b = req.body) === null || _b === void 0 ? void 0 : _b.time });
        console.log(req.params.cinema_id);
        console.log(req.body.date);
        console.log(req.body.time);
        console.log(tickets);
        const seats = yield seat_model_1.default.find();
        let seatingPlan = [];
        for (let i = 0; i < seats.length; i++) {
            const filterData = tickets.find((ticket) => {
                var _a;
                return ((_a = ticket.seatNumber) === null || _a === void 0 ? void 0 : _a.findIndex((number) => number === seats[i].seatNumber)) !== -1;
            });
            let data = {};
            if (filterData && filterData !== undefined) {
                data = {
                    seatNumber: seats[i].seatNumber,
                    status: filterData.status,
                    price: seats[i].price
                };
            }
            else {
                data = {
                    seatNumber: seats[i].seatNumber,
                    status: "available",
                    price: seats[i].price
                };
            }
            seatingPlan.push(data);
        }
        var sortedSeat = seatingPlan.sort((a, b) => a.seatNumber < b.seatNumber ? -1 : 1);
        let firstName = "";
        let result = [];
        let firstArrIndex = 0;
        for (let i = 0; i < sortedSeat.length; i++) {
            if (i === 0) {
                result[firstArrIndex] = [sortedSeat[i]];
                firstName = sortedSeat[i].seatNumber[0];
            }
            else if (sortedSeat[i].seatNumber.indexOf(firstName) === -1) {
                firstArrIndex += 1;
                firstName = sortedSeat[i].seatNumber[0];
                result[firstArrIndex] = [sortedSeat[i]];
            }
            else {
                result[firstArrIndex] = [...result[firstArrIndex], sortedSeat[i]];
            }
        }
        if (!result) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
            logger_1.logger.error("Not found Ticket!");
        }
        res.json({ tickets: result, status: 1 });
        logger_1.logger.info("Successfully got Tickets by Cinema ID!");
    }
    catch (err) {
        next(err);
        logger_1.logger.error("Failed to get tickets!");
    }
});
exports.getTicketByCinemaIdService = getTicketByCinemaIdService;
