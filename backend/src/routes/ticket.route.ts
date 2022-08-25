import express from 'express';
import mongoose from 'mongoose';
import { getTickets,getTicket ,createTicket, updateTicket, deleteTicket, findTicket, getTicketByCinemaId } from '../controllers/ticket.controller';
import {body } from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(getTicket)
  .get(getTickets)
  .post([
    body("date").notEmpty().withMessage("date must not be empty"),
    body("time").notEmpty().withMessage("Time must not be empty")
  ],
    createTicket)

router
  .route("/findTicket")
  .post([
    body("date").notEmpty().withMessage("date must not be empty"),
    body("time").notEmpty().withMessage("Time must not be empty")
  ],
    findTicket)


router
  .route("/:id")
  .put([
      body("date").notEmpty().withMessage("date must not be empty"),
      body("time").notEmpty().withMessage("Time must not be empty")
    ],
    updateTicket)
  .delete(deleteTicket)

router
  .route('/:cinema_id')
  .post([
    body("date").notEmpty().withMessage("date must not be empty"),
    body("time").notEmpty().withMessage("time must not be empty")
  ],
    getTicketByCinemaId)

export default router;


