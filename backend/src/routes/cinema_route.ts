import express from 'express';
import { getCinema, createCinema, findCinema, updateCinema, deleteCinema} from '../controllers/CinemaController';
import {body} from 'express-validator';
import { findByIdService } from '../services/cinema.service';

const router = express.Router();

router
  .route("/")
  .get(getCinema)
  .post(
      [
        body("code").notEmpty().withMessage("code must not be empty"),
        body("name").notEmpty().withMessage("Cinema Name must not be empty"),
        body("location").notEmpty().withMessage("Location must not be empty"),
        body("date").notEmpty().withMessage("Date must not be empty"),
        body("time").notEmpty().withMessage("Time must not be empty")
    ],
  createCinema);

router
  .route("/search")
  .post(findByIdService)

router
  .route("/:id")
  .get(findCinema)
  .put(
    [
      body("code").notEmpty().withMessage("Code must not be empty"),
      body("name").notEmpty().withMessage("Cinema Name must not be empty"),
      body("location").notEmpty().withMessage("Location must not be empty"),
      body("date").notEmpty().withMessage("Date must not be empty"),
      body("time").notEmpty().withMessage("Time must not be empty")
    ],
    updateCinema)
    .delete(deleteCinema)
export default router;