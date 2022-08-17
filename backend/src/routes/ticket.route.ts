import express from 'express';
import mongoose from 'mongoose';
import { getTickets, createTicket, updateTicket, deleteTicket,findTicket,getTicketByCinemaId } from '../controllers/ticket.controller';
import {body } from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(getTickets)
  .post([
    body("date").notEmpty().withMessage("date must not be empty"),
    body("time").notEmpty().withMessage("Time must not be empty")
  ],
    createTicket);

router
  .route("/:id")
  .get(findTicket)
  .put(
    [
      body("date").notEmpty().withMessage("date must not be empty"),
      body("time").notEmpty().withMessage("Time must not be empty")
    ],
    updateTicket)
  .delete(deleteTicket)

router
<<<<<<< HEAD
  .route('/:cinema_id')
  .post([
    body("date").notEmpty().withMessage("date must not be empty"),
    body("time").notEmpty().withMessage("time must not be empty")
  ],
    createTicket);

=======
  .route('/setAvailability')
  .put(async (req, res) => {
    try {
      const { movieId, cinemaName, seatNumbers, newStatus } = req.body;

      const statusToSet = newStatus in SeatAvailability ? newStatus : SeatAvailability.empty;

      const result = await updateAvalability(cinemaName, movieId, seatNumbers, statusToSet);

      res.status(200).send({ message: result });
    } catch (err) {
      //throw new Error();
    }
  });

router
  .route('/getAvailability/:movieId/:cinemaName')
  .get(async (req, res) => {
    try {
      const { movieId, cinemaName } = req.params;
      const result = await getCinemaAvailability(cinemaName, movieId);
      res.status(200).send(result);

    } catch (err) {
      //throw new Error();
    }
  })
  
>>>>>>> d829e8b75356049a6f8c41e5fd2ffb534ba14c15
export default router;


