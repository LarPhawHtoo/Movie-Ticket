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
const express_1 = __importDefault(require("express"));
const ticket_service_1 = require("../services/ticket.service");
const ticket_1 = require("../interfaces/ticket");
const router = express_1.default.Router();
router
    .route('/getMovies')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesResult = yield (0, ticket_service_1.getMovies)();
        res.status(200).send(moviesResult);
    }
    catch (err) {
        //throw new Error();
    }
}));
router
    .route('/getCinemas')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinemasResult = yield (0, ticket_service_1.getCinemas)();
        res.status(200).send(cinemasResult);
    }
    catch (err) {
        //throw new Error();
    }
}));
router
    .route('/setAvailability')
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId, cinemaName, seatNumbers, newStatus } = req.body;
        const statusToSet = newStatus in ticket_1.SeatAvailability ? newStatus : ticket_1.SeatAvailability.empty;
        const result = yield (0, ticket_service_1.updateAvalability)(cinemaName, movieId, seatNumbers, statusToSet);
        res.status(200).send({ message: result });
    }
    catch (err) {
        //throw new Error();
    }
}));
router
    .route('/getAvailability/:movieId/:cinemaName')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId, cinemaName } = req.params;
        const result = yield (0, ticket_service_1.getCinemaAvailability)(cinemaName, movieId);
        res.status(200).send(result);
    }
    catch (err) {
        //throw new Error();
    }
}));
exports.default = router;
