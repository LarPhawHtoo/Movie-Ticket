import express from 'express';
import { getCinema, createCinema, findCinema, updateCinema, deleteCinema} from '../controllers/cinema.controller';
import {body} from 'express-validator';
import { findByIdService } from '../services/cinema.service';

const router = express.Router();

router
  .route("/")
  .get(getCinema)
  .post(
      [
        body("name").notEmpty().withMessage("Cinema Name must not be empty"),
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
      body("name").notEmpty().withMessage("Cinema Name must not be empty"),
    ],
    updateCinema)
    .delete(deleteCinema)
export default router;