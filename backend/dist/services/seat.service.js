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
var seats = [
    [{ id: 'A1', status: 0, disable: 0 }, { id: 'A2', status: 0, disable: 0 }, { id: 'A3', status: 0, disable: 0 }, { id: 'A4', status: 0, disable: 0 }, { id: 'A5', status: 0, disable: 0 }, { id: 'A6', status: 0, disable: 0 }, { id: 'A7', status: 0, disable: 0 }, { id: 'A8', status: 0, disable: 0 }, { id: 'A9', status: 0, disable: 0 }, { id: 'A10', status: 0, disable: 0 }, { id: 'A11', status: 0, disable: 0 }, { id: 'A12', status: 0, disable: 0 }],
    [{ id: 'B1', status: 0, disable: 0 }, { id: 'B2', status: 0, disable: 0 }, { id: 'B3', status: 0, disable: 0 }, { id: 'B4', status: 0, disable: 0 }, { id: 'B5', status: 0, disable: 0 }, { id: 'B6', status: 0, disable: 0 }, { id: 'B7', status: 0, disable: 0 }, { id: 'B8', status: 0, disable: 0 }, { id: 'B9', status: 0, disable: 0 }, { id: 'B10', status: 0, disable: 0 }, { id: 'B11', status: 0, disable: 0 }, { id: 'B12', status: 0, disable: 0 }],
    [{ id: 'C1', status: 0, disable: 0 }, { id: 'C2', status: 0, disable: 0 }, { id: 'C3', status: 0, disable: 0 }, { id: 'C4', status: 0, disable: 0 }, { id: 'C5', status: 0, disable: 0 }, { id: 'C6', status: 0, disable: 0 }, { id: 'C7', status: 0, disable: 0 }, { id: 'C8', status: 0, disable: 0 }, { id: 'C9', status: 0, disable: 0 }, { id: 'C10', status: 0, disable: 0 }, { id: 'C11', status: 0, disable: 0 }, { id: 'C12', status: 0, disable: 0 }],
    [{ id: 'D1', status: 0, disable: 0 }, { id: 'D2', status: 0, disable: 0 }, { id: 'D3', status: 0, disable: 0 }, { id: 'D4', status: 0, disable: 0 }, { id: 'D5', status: 0, disable: 0 }, { id: 'D6', status: 0, disable: 0 }, { id: 'D7', status: 0, disable: 0 }, { id: 'D8', status: 0, disable: 0 }, { id: 'D9', status: 0, disable: 0 }, { id: 'D10', status: 0, disable: 0 }, { id: 'D11', status: 0, disable: 0 }, { id: 'D12', status: 0, disable: 0 }],
    [{ id: 'E1', status: 0, disable: 0 }, { id: 'E2', status: 0, disable: 0 }, { id: 'E3', status: 0, disable: 0 }, { id: 'E4', status: 0, disable: 0 }, { id: 'E5', status: 0, disable: 0 }, { id: 'E6', status: 0, disable: 0 }, { id: 'E7', status: 0, disable: 0 }, { id: 'E8', status: 0, disable: 0 }, { id: 'E9', status: 0, disable: 0 }, { id: 'E10', status: 0, disable: 0 }, { id: 'E11', status: 0, disable: 0 }, { id: 'E12', status: 0, disable: 0 }],
    [{ id: 'F1', status: 0, disable: 0 }, { id: 'F2', status: 0, disable: 0 }, { id: 'F3', status: 0, disable: 0 }, { id: 'F4', status: 0, disable: 0 }, { id: 'F5', status: 0, disable: 0 }, { id: 'F6', status: 0, disable: 0 }, { id: 'F7', status: 0, disable: 0 }, { id: 'F8', status: 0, disable: 0 }, { id: 'F9', status: 0, disable: 0 }, { id: 'F10', status: 0, disable: 0 }, { id: 'F11', status: 0, disable: 0 }, { id: 'F12', status: 0, disable: 0 }],
    [{ id: 'G1', status: 0, disable: 0 }, { id: 'G2', status: 0, disable: 0 }, { id: 'G3', status: 0, disable: 0 }, { id: 'G4', status: 0, disable: 0 }, { id: 'G5', status: 0, disable: 0 }, { id: 'G6', status: 0, disable: 0 }, { id: 'G7', status: 0, disable: 0 }, { id: 'G8', status: 0, disable: 0 }, { id: 'G9', status: 0, disable: 0 }, { id: 'G10', status: 0, disable: 0 }, { id: 'G11', status: 0, disable: 0 }, { id: 'G12', status: 0, disable: 0 }],
    [{ id: 'H1', status: 0, disable: 0 }, { id: 'H2', status: 0, disable: 0 }, { id: 'H3', status: 0, disable: 0 }, { id: 'H4', status: 0, disable: 0 }, { id: 'H5', status: 0, disable: 0 }, { id: 'H6', status: 0, disable: 0 }, { id: 'H7', status: 0, disable: 0 }, { id: 'H8', status: 0, disable: 0 }, { id: 'H9', status: 0, disable: 0 }, { id: 'H10', status: 0, disable: 0 }, { id: 'H11', status: 0, disable: 0 }, { id: 'H12', status: 0, disable: 0 }],
    [{ id: 'I1', status: 0, disable: 0 }, { id: 'I2', status: 0, disable: 0 }, { id: 'I3', status: 0, disable: 0 }, { id: 'I4', status: 0, disable: 0 }, { id: 'I5', status: 0, disable: 0 }, { id: 'I6', status: 0, disable: 0 }, { id: 'I7', status: 0, disable: 0 }, { id: 'I8', status: 0, disable: 0 }, { id: 'I9', status: 0, disable: 0 }, { id: 'I10', status: 0, disable: 0 }, { id: 'I11', status: 0, disable: 0 }, { id: 'I12', status: 0, disable: 0 }],
    [{ id: 'J1', status: 0, disable: 0 }, { id: 'J2', status: 0, disable: 0 }, { id: 'J3', status: 0, disable: 0 }, { id: 'J4', status: 0, disable: 0 }, { id: 'J5', status: 0, disable: 0 }, { id: 'J6', status: 0, disable: 0 }, { id: 'J7', status: 0, disable: 0 }, { id: 'J8', status: 0, disable: 0 }, { id: 'J9', status: 0, disable: 0 }, { id: 'J10', status: 0, disable: 0 }, { id: 'J11', status: 0, disable: 0 }, { id: 'J12', status: 0, disable: 0 }]
];
seats.push(seats);
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
            res.json({
                success: true,
                message: "Seats fetched",
                seats: seats,
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
            date: req.body.date,
            seatNumber: req.body.seatNumber
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
        seat.date = req.body.date;
        seat.seatNumber = req.body.seatNumber;
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
