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
exports.getSeatByCinemaId = exports.deleteSeat = exports.updateSeat = exports.createSeat = exports.findSeat = exports.getSeats = void 0;
const seat_service_1 = require("../services/seat.service");
const getSeats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, seat_service_1.getSeatService)(req, res, next);
});
exports.getSeats = getSeats;
const findSeat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, seat_service_1.findSeatService)(req, res, next);
});
exports.findSeat = findSeat;
const createSeat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, seat_service_1.createSeatService)(req, res, next);
});
exports.createSeat = createSeat;
const updateSeat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, seat_service_1.updateSeatService)(req, res, next);
});
exports.updateSeat = updateSeat;
const deleteSeat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, seat_service_1.deleteSeatService)(req, res, next);
});
exports.deleteSeat = deleteSeat;
////
const getSeatByCinemaId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, seat_service_1.getSeatByCinemaIdService)(req, res, next);
});
exports.getSeatByCinemaId = getSeatByCinemaId;
