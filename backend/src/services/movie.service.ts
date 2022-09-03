import { Request, Response, NextFunction } from 'express';
import Movie from '../models/movie.model';
import Cinema from "../models/cinema.model";
import Seat from "../models/seat.model";
import { SeatCreate } from '../interfaces/seat';
import { validationResult } from 'express-validator';
import { Validator } from 'node-input-validator';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { deleteFile } from '../utils/utils';
import { MovieCreate } from '../interfaces/movie';
import movieModel from '../models/movie.model';
import { logger } from "../logger/logger"
/**
 * get movie service.
 * @param _req 
 * @param res 
 * @param next 
 */
export const getMovieService = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies: any = await Movie.find();
    
    if (!movies) {
      res.json({
        success: false,
        message: "Not Found! ",
      });
      logger.error("Movie not found");
    }
    res.json({
      success: true,
      message: "Movies fetched",
      movies: movies,
      status: 1,
    });
    logger.info("Successfully fetched movies");
  } catch (err) {
    next(err);
    logger.error("Error fetching movies");
  }
};

/**
 * create post service
 * @param req 
 * @param res 
 * @param next 
 */

export const createMovieService = async (req: any, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        const error: any = new Error("Validation failed!");
        error.data = errors.array();
        error.statusCode = 401;
        throw error;
        logger.error("Validation failed");
      }
      let image: any = req.body.image;
      if (req.files) {
        image = req.files.image[0].path.replaceAll("\\", "/");
      }
      const movieTdo: MovieCreate = {
        code: req.body.code,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating,
        cinema_id: req.body.cinema_id,
        time: req.body.time,
        status: req.body.status,
        image: image,
        created_user_id: req.body.created_user_id,
      }
      const movie: any = new Movie(movieTdo);
      const result = await movie.save();

      res
        .status(201)
        .json({ message: "Created Movie Successfully!", movies: result, status: 1 });
      logger.info("Movie created successfully");
    } catch (err) {
      next(err);
      logger.error("Error creating Movie");
    }
};
  
export const nowShowingService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const cinema: any = await Cinema.find();
    const movies: any = await Movie.find({ deleted_at: null });
    //console.log(movies);

    if (!movies) {
      res.json({
        success: false,
        message: "Not found movie",
      });
    }
    var show = "Now Showing";
    var resultStatus: any = [];
    for (let i = 0; i < movies.length; i++) {
      let data = {
        movieStatus: movies[i].status,
        cinema_name: movies[i].cinema_id,
        time: movies[i].time,
        movieName: movies[i].name,
        image: movies[i].image,
      }
      if (data.movieStatus == show) {
        resultStatus.push(data);
      }
     
    }
    console.log(resultStatus);
    
    res.json({
      message: "Now Showing Movies",
      movies: resultStatus,
    })
  } catch (err) {
    next(err);
  }
};

  export const findMovieService = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        const error: any = Error("Not Found!");
        error.statusCode = 401;
        throw error;
        logger.error("Not Found!");
      }
      res.json({ movies: movie, status: 1 });
      logger.info("Successfully found movie!");
    } catch (err) {
      next(err);
      logger.error("Error finding movie!");
    }
  }

  export const updateMovieService = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        const error: any = new Error("Validation failed!");
        error.data = errors.array();
        error.statusCode = 401;
        throw error;
        logger.error("Validation failed");
      }
      const movie: any = await Movie.findById(req.params.id);
      if (!movie) {
        const error: any = new Error("Not Found!");
        error.statusCode = 401;
        throw error;
        logger.error("Not Found!");
      }
      let image: string = req.body.image;
      if (req.file) {
        image = req.file.path.replace("\\", "/");
        if (movie.image && movie.image != image) {
          deleteFile(movie.image);
        }
        if (image) {
          movie.image = image;
        }
      }
      movie.code = req.body.code;
      movie.name = req.body.name;
      movie.year = req.body.year;
      movie.rating = req.body.rating;
      movie.image = image;
      movie.created_user_id = req.body.created_user_id;
      movie.updated_user_id = req.body.updated_user_id;
      const result = await movie.save();
      res.json({ message: "Updated Successfully!", movies: result, status: 1 });
      logger.info("Movie Updated Successfully");
    } catch (err) {
      next(err);
      logger.error("Error updating movie");
    }
  };


  export const deleteMovieService = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movie: any = await Movie.findByIdAndRemove(req.params.id);
      if (!movie) {
        const error: any = new Error("Not Found!");
        error.statusCode = 401;
        throw error;
        logger.error("Not Found!");
      }
      res.json({
        message: "Delete Movie Successfully!",
        movies: movie,
        status: 1,
      });
      logger.info("Movie deleted successfully");
    } catch (err) {
      next(err);
      logger.error("Error deleting Movie");
    }
  };


  export const findByIdService = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movies = await Movie.findById(req.params.id);
      res.json({ movies: movies, status: 1 });
      logger.info("Movie found successfully");
    } catch (err) {
      next(err);
      logger.error("Error finding movie");
    }
  };
