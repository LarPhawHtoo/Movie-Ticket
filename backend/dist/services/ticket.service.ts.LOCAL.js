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
        }
        var sortedTicket = tickets.sort((a, b) => a.seatNumber < b.seatNumber ? -1 : 1);
        res.json({
            success: true,
            message: "Tickets fetched",
            tickets: sortedTicket,
            status: 1,
        });
    }
    catch (err) {
        next(err);
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
        let date = req.body.date;
        console.log(date);
        let time = req.body.time;
        console.log(time);
        const ticket = yield ticket_model_1.default.find({ date, time });
        console.log(ticket);
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
        ticket.date = req.body.date;
        ticket.time = req.body.time;
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
 * get Ticket by Cinema Id service
 * @param req
 * @param res
 * @param next
 */
const getdashBoardata = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield cinema_model_1.default.findById(req.params.cinema_id);
        console.log(cinema);
        const ticket = yield ticket_model_1.default.find({ cinema_id: cinema === null || cinema === void 0 ? void 0 : cinema._id });
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
        console.log(sortedStatus);
        let firstName = "";
        let result = [];
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
exports.getdashBoardata = getdashBoardata;
const getTicketByCinemaIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield cinema_model_1.default.findById(req.params.cinema_id);
        let date = req.body.date;
        let time = req.body.time;
        const tickets = yield ticket_model_1.default.find({ cinema_id: cinema === null || cinema === void 0 ? void 0 : cinema._id, date, time });
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
                };
            }
            else {
                data = {
                    seatNumber: seats[i].seatNumber,
                    status: "available",
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
        }
        res.json({ tickets: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.getTicketByCinemaIdService = getTicketByCinemaIdService;
