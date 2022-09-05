import express from 'express';
import {  getMovies, createMovie, findMovie, updateMovie, deleteMovie, nowShowing} from '../controllers/movie.controller';
import { body } from 'express-validator';
import { findByIdService } from '../services/movie.service';
import { getdashBoardService } from '../services/ticket.service';
import { nowShowingService} from '../services/movie.service';

const router = express.Router();

router
  .route("/")
  .get(getMovies)
  .post(
    [
      body("code").notEmpty().withMessage("code must not be empty"),
      body("name").notEmpty().withMessage("Movie Name must not be empty"),
      body("year").notEmpty().withMessage("Year must not be empty"),
      body("rating").notEmpty().withMessage("Rating must note be empty")
    ],
    createMovie);

router 
  .route("/now-showing")
  .post(
    [
      body("time").notEmpty().withMessage("time must not be empty"),
      body("date").notEmpty().withMessage("date must not be empty")
    ],
    nowShowing)

router
  .route("/search")
  .post(findByIdService)

router
  .route("/:id")
  .get(findMovie)
  .put(
    [
      body("code").notEmpty().withMessage("Code must not be empty"),
      body("name").notEmpty().withMessage("Movie Name must note be empty"),
      body("year").notEmpty().withMessage("Year must not be empty"),
      body("rating").notEmpty().withMessage("Rating must not be empty")
    ],
    updateMovie)
  .delete(deleteMovie)

export default router;