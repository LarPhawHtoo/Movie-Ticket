//const config = require('../config/database');
import express from 'express';
import mongoose from 'mongoose';
import { getSeats, createSeat, updateSeat, deleteSeat,findSeat } from '../controllers/seat.controller';
import {body } from 'express-validator';

const router = express.Router();
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
  .get(getSeats)
  .post([
    body("date").notEmpty().withMessage("date must not be empty"),
    body("row").notEmpty().withMessage("row must be empty"),
    body("column").notEmpty().withMessage("column must be empty"),
    body("isReversed").notEmpty().withMessage("isReversed must be empty"),
  ],
    createSeat);
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
  .get(findSeat)
  .put(
    [
      body("date").notEmpty().withMessage("date must not be empty"),
      body("row").notEmpty().withMessage("Seat of row must note be empty"),
      body("column").notEmpty().withMessage("column must not be empty"),
      body("isReversed").notEmpty().withMessage("isReversed must be empty")
    ],
    updateSeat)
  .delete(deleteSeat)
export default router;


