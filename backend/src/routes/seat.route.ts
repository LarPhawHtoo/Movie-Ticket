import express from 'express';
import mongoose from 'mongoose';
import { getSeats, createSeat, updateSeat, deleteSeat,findSeat,getSeatByCinemaId } from '../controllers/seat.controller';
import {body } from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(getSeats)
  .post([
    body("date").notEmpty().withMessage("date must not be empty"),
    body("seatNumber").notEmpty().withMessage("Seat of number must not be empty")
  ],
    createSeat)

router
  .route("/:id")
  .get(findSeat)
  .put(
    [
      body("date").notEmpty().withMessage("date must not be empty"),
      body("seatNumber").notEmpty().withMessage("Seat of number must not be empty")
    ],
    updateSeat)
  .delete(deleteSeat)

router
  .route('/:cinema_id')
  .post([
    body("date").notEmpty().withMessage("date must not be empty")
  ],
    getSeatByCinemaId)

export default router;


