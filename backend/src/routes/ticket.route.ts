import express from 'express';
import mongoose from 'mongoose';
import { getMovies, getCinemas, getCinemaAvailability,updateAvalability } from '../services/ticket.service';
import { body } from 'express-validator';
import { MovieCreate } from '../interfaces/movie';
import { SeatAvailability } from '../interfaces/ticket';

const router = express.Router();

router
  .route('/getMovies')
  .get(async (req, res) => {
    try {
      const moviesResult: Array<MovieCreate> = await getMovies();
      res.status(200).send(moviesResult);
    }catch (err) {
    //throw new Error();
  }
  });

router
  .route('/getCinemas')
  .get(async (req, res) => {
    try {
      const cinemasResult: Array<string> = await getCinemas();
      res.status(200).send(cinemasResult);
    } catch (err) {
      //throw new Error();
    }
  });

router
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
  
export default router;


