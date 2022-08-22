"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seat_controller_1 = require("../controllers/seat.controller");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router
    .route('/')
    .get(seat_controller_1.getSeats)
    .post([
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("seatNumber").notEmpty().withMessage("Seat of number must not be empty")
], seat_controller_1.createSeat);
router
    .route("/:id")
    .get(seat_controller_1.findSeat)
    .put([
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("seatNumber").notEmpty().withMessage("Seat of number must not be empty")
], seat_controller_1.updateSeat)
    .delete(seat_controller_1.deleteSeat);
exports.default = router;
