import express from "express";
import mongoose from "mongoose";
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  findTicket,
  getTicketByCinemaId
} from "../controllers/ticket.controller";
import { body } from "express-validator";
import { MovieCreate } from "../interfaces/movie";
import { SeatAvailability } from "../interfaces/ticket";

const router = express.Router();

router
  .route("/")
  .get(getTickets)
  .post(
    [
      body("customer_name")
        .notEmpty()
        .withMessage("Customer mame must not be empty"),
      body("seat_id").notEmpty().withMessage("Seat of Id must not be empty"),
      body("cinema_id")
        .notEmpty()
        .withMessage("Cinema of Id must not be empty"),
      body("date").notEmpty().withMessage("Date must not be empty"),
    ],
    createTicket
  );

router
  .route("/:id")
  .get(findTicket)
  .put(updateTicket)
  .delete(deleteTicket);

router
  .route("/:cinema_id")
  .post(
    [
      body("date").notEmpty().withMessage("date must not be empty"),
      body("time").notEmpty().withMessage("Time must not be empty")
    ],
    getTicketByCinemaId
  );
export default router;
