"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const config = require('../config/database');
const express_1 = __importDefault(require("express"));
const seat_controller_1 = require("../controllers/seat.controller");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
//const Reservation = require('../models/reservation');
//router.post('/reserve', (req, res) => {
//
//    Seat.reserveSeat({ seats: req.body.seats }, (err, done) => {
//        if (err) {
//            res.json({
//                msg: "Failed to reserve seats " + err,
//                success: false,
//            });
//        } else {
//            let reservation = new Reservation({
//                firstName: req.body.personInfo.firstName,
//                lastName: req.body.personInfo.lastName,
//                phoneNumber: req.body.personInfo.phoneNumber,
//                email: req.body.personInfo.email,
//                seats: req.body.seats,
//                seance: req.body.seance
//            })
//            Reservation.addReservation(reservation, (err2, reserv) => {
//                if (err) {
//                    res.json({
//                        msg: "Failed to reserve seats " + err2,
//                        success: false,
//                    });
//                } else {
//                    res.json({
//                        msg: "Reservation has done: ",
//                        success: true,
//                        reservation: reserv,
//                        updatedSeats: done
//                    });
//                }
//            })
//        }
//    });
//});
router
    .route('/')
    .get(seat_controller_1.getSeats)
    .post([
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("row").notEmpty().withMessage("row must be empty"),
    (0, express_validator_1.body)("column").notEmpty().withMessage("column must be empty"),
    (0, express_validator_1.body)("isReversed").notEmpty().withMessage("isReversed must be empty"),
], seat_controller_1.createSeat);
//router.post('/getseats', (req, res) => {
//})
//router.get('/all', (req, res) => {
//    Seat.find({}, (err, seats) => {
//        if (err) {
//            res.json({
//                success: false,
//                message: "An error occured while fetching seats",
//            })
//        } else {
//            res.json({
//                success: true,
//                message: "Seats fetched",
//                seats: seats
//            })
//        }
//    })
//})
router
    .route("/:id")
    .get(seat_controller_1.findSeat)
    .put([
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("row").notEmpty().withMessage("Seat of row must note be empty"),
    (0, express_validator_1.body)("column").notEmpty().withMessage("column must not be empty"),
    (0, express_validator_1.body)("isReversed").notEmpty().withMessage("isReversed must be empty")
], seat_controller_1.updateSeat)
    .delete(seat_controller_1.deleteSeat);
exports.default = router;
