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
exports.getTicketByCinemaIdService = exports.getdashBoardata = exports.deleteTicketService = exports.updateTicketService = exports.findTicketService = exports.createTicketService = exports.getTicketService = void 0;
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const cinema_model_1 = __importDefault(require("../models/cinema.model"));
const seat_model_1 = __importDefault(require("../models/seat.model"));
const express_validator_1 = require("express-validator");
const movie_model_1 = __importDefault(require("../models/movie.model"));
/**
 * get tickets service
 * @param _req
 * @param res
 * @param next
 */
const getTicketService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    ticket_model_1.default.find(req.body.tickets, (err, tickets) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while fetching tickets: " + err,
            });
        }
        else {
            var sortedTicket = tickets.sort((a, b) => a.seatNumber < b.seatNumber ? -1 : 1);
            res.json({
                success: true,
                message: "Tickets fetched",
                tickets: sortedTicket,
                status: 1,
            });
        }
    });
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
        }
        const ticketTdo = {
            customer_name: req.body.customer_name,
            cinema_id: req.body.cinema_id,
            movie_id: req.body.movie_id,
            seatNumber: req.body.seatNumber,
            price: req.body.price,
            status: req.body.status,
        };
        const ticket = new ticket_model_1.default(ticketTdo);
        const result = yield ticket.save();
        res.status(201).json({
            message: "Created Ticket successfully!",
            tickets: result,
            status: 1,
        });
    }
    catch (err) {
        next(err);
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
        if (!ticket) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ tickets: ticket, status: 1 });
    }
    catch (err) {
        next(err);
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
        }
        const ticket = yield ticket_model_1.default.findByIdAndUpdate(req.params.id);
        if (!ticket) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        ticket.customer_name = req.body.customer_name;
        ticket.cinema_id = req.body.cinema_id;
        ticket.movie_id = req.body.movie_id;
        ticket.seatNumber = req.body.seatNumber;
        ticket.price = req.body.price;
        ticket.status = req.body.status;
        const result = yield ticket.save();
        res.json({
            message: "Updated Ticket Successfully!",
            tickets: result,
            status: 1,
        });
    }
    catch (err) {
        next(err);
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
        }
        res.json({
            message: "Delete Ticket Successfully!",
            tickets: ticket,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTicketService = deleteTicketService;
/**
 * get getdashBoar by Cinema Id service
 * @param req
 * @param res
 * @param next
 */
const getdashBoardata = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield cinema_model_1.default.find();
        console.log(cinema);
        const ticket = yield ticket_model_1.default.find({ date: req.body.date });
        const movie = yield movie_model_1.default.find({ deleted_at: null });
        var resultMovie = [];
        for (let i = 0; i < movie.length; i++) {
            for (let j = 0; j < movie[i].time.length; j++) {
                let data = {
                    cinema_name: movie[i].cinema_id,
                    movieName: movie[i].name,
                    time: movie[i].time[j],
                    date: req.body.date,
                    image: movie[i].image,
                };
                resultMovie.push(data);
                const seats = yield seat_model_1.default.find();
                let seatingList = [];
                for (let i = 0; i < seats.length; i++) {
                    const filter = ticket.find((ticket) => { var _a; return ((_a = ticket.seatNumber) === null || _a === void 0 ? void 0 : _a.findIndex((number) => number === seats[i].seatNumber)) !== -1; });
                    let data = {};
                    if (filter && filter !== undefined) {
                        data = {
                            seatNumber: seats[i].seatNumber,
                            status: filter.status,
                        };
                    }
                    else {
                        data = {
                            seatNumber: seats[i].seatNumber,
                            status: "Available",
                        };
                    }
                    seatingList.push(data);
                }
                var sortedStatus = seatingList.sort((a, b) => a.status < b.status ? -1 : 1);
                // console.log(sortedStatus);
                let firstName = "";
                var result = [];
                let firstArrIndex = 0;
                for (let i = 0; i < sortedStatus.length; i++) {
                    if (i === 0) {
                        result[firstArrIndex] = [sortedStatus[i]];
                        firstName = sortedStatus[i].status[0];
                    }
                    else if (sortedStatus[i].status.indexOf(firstName) === -1) {
                        firstArrIndex += 1;
                        firstName = sortedStatus[i].status[0];
                        result[firstArrIndex] = [sortedStatus[i]];
                    }
                    else {
                        result[firstArrIndex] = [...result[firstArrIndex], sortedStatus[i]];
                    }
                }
                resultMovie.push(sortedStatus);
            }
        }
        // resultMovie.push(result);
        if (!resultMovie) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ tickets: resultMovie, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.getdashBoardata = getdashBoardata;
const getTicketByCinemaIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield cinema_model_1.default.findById(req.params.cinema_id);
        console.log(cinema);
        const tickets = yield ticket_model_1.default.find({ cinema_id: cinema === null || cinema === void 0 ? void 0 : cinema._id });
        const seats = yield seat_model_1.default.find();
        console.log(seats);
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
                };
            }
            else {
                data = {
                    seatNumber: seats[i].seatNumber,
                    status: "available",
                };
            }
            //console.log('data', data);
            seatingPlan.push(data);
        }
        //console.log('plan', seatingPlan);
        var sortedSeat = seatingPlan.sort((a, b) => a.seatNumber < b.seatNumber ? -1 : 1);
        //console.log(sortedSeat);
        let firstName = "";
        let result = [];
        let firstArrIndex = 0;
        for (let i = 0; i < sortedSeat.length; i++) {
            if (i === 0) {
                //console.log('result', result);
                result[firstArrIndex] = [sortedSeat[i]];
                firstName = sortedSeat[i].seatNumber[0];
                //console.log('after result', result);
            }
            else if (sortedSeat[i].seatNumber.indexOf(firstName) === -1) {
                firstArrIndex += 1;
                //console.log('result', result);
                firstName = sortedSeat[i].seatNumber[0];
                result[firstArrIndex] = [sortedSeat[i]];
                //console.log('after result', result);
            }
            else {
                //console.log('result', result);
                result[firstArrIndex] = [...result[firstArrIndex], sortedSeat[i]];
                //console.log('after result', result);
            }
        }
        if (!result) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ tickets: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.getTicketByCinemaIdService = getTicketByCinemaIdService;
