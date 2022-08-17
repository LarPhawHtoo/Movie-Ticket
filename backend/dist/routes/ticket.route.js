"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_controller_1 = require("../controllers/ticket.controller");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router
    .route("/")
    .get(ticket_controller_1.getTickets)
    .post([
    (0, express_validator_1.body)("customer_name")
        .notEmpty()
        .withMessage("Customer mame must not be empty"),
    (0, express_validator_1.body)("seat_id").notEmpty().withMessage("Seat of Id must not be empty"),
    (0, express_validator_1.body)("cinema_id")
        .notEmpty()
        .withMessage("Cinema of Id must not be empty"),
    (0, express_validator_1.body)("date").notEmpty().withMessage("Date must not be empty"),
], ticket_controller_1.createTicket);
router
    .route("/:id")
    .get(ticket_controller_1.findTicket)
    .put(ticket_controller_1.updateTicket)
    .delete(ticket_controller_1.deleteTicket);
router
    .route("/:cinema_id")
    .post([
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("time").notEmpty().withMessage("Time must not be empty")
], ticket_controller_1.getTicketByCinemaId);
exports.default = router;
