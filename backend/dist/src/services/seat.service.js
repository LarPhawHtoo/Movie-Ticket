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
exports.deleteSeatService = exports.updateSeatService = exports.findSeatService = exports.createSeatService = exports.getSeatService = void 0;
const seat_model_1 = __importDefault(require("../models/seat.model"));
const express_validator_1 = require("express-validator");
/**
 * get seat service
 * @param _req
 * @param res
 * @param next
 */
const getSeatService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    seat_model_1.default.find(req.body.seats, (err, seats) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while fetching seats: " + err,
            });
        }
        else {
            var sortedSeat = seats.sort((a, b) => (a.seatNumber < b.seatNumber ? -1 : 1));
            res.json({
                success: true,
                message: "Seats fetched",
                seats: sortedSeat,
                status: 1,
            });
        }
    });
});
exports.getSeatService = getSeatService;
/**
 * create seat service
 * @param _req
 * @param res
 * @param next
 */
const createSeatService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        const seatTdo = {
            seatNumber: req.body.seatNumber,
            status: req.body.status,
            cinema_id: req.body.cinema_id,
            price: req.body.price,
        };
        const seat = new seat_model_1.default(seatTdo);
        const result = yield seat.save();
        res.status(201).json({
            message: "Created Seat successfully!",
            data: result,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createSeatService = createSeatService;
/**
 * find seat service
 * @param req
 * @param res
 * @param next
 */
const findSeatService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seat = yield seat_model_1.default.findById(req.params.id);
        if (!seat) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ data: seat, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findSeatService = findSeatService;
/**
 * Update seat service
 * @param req
 * @param res
 * @param next
 */
const updateSeatService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        const seat = yield seat_model_1.default.findById(req.params.id);
        if (!seat) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        seat.seatNumber = req.body.seatNumber;
        seat.status = req.body.status;
        seat.cinema_id = req.body.cinema_id;
        seat.price = req.body.price;
        const result = yield seat.save();
        res.json({
            message: "Updated Seat Successfully!",
            data: result,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSeatService = updateSeatService;
/**
 * delete seat service
 * @param req
 * @param res
 * @param next
 */
const deleteSeatService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seat = yield seat_model_1.default.findByIdAndRemove(req.params.id);
        if (!seat) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        seat.deleted_at = new Date();
        const result = yield seat.save();
        res.json({ message: "Delete Seat Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSeatService = deleteSeatService;
