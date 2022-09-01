import { Request, Response, NextFunction } from 'express';
import Movie from '../models/movie.model';
import Cinema from "../models/cinema.model";
import Seat from "../models/seat.model";
import { SeatCreate } from '../interfaces/seat';
import { validationResult } from 'express-validator';
import { deleteFile } from '../utils/utils';
import { MovieCreate } from '../interfaces/movie';
import movieModel from '../models/movie.model';
import { ChainCondition } from 'express-validator/src/context-items';
import multer, { FileFilterCallback } from "multer";
const upload: any = multer({ dest: 'apiuploads/movies' });
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
    }
    res.json({
      success: true,
      message: "Movies fetched",
      movies: movies,
      status: 1,
    });
  } catch (err) {
    next(err);
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
      .json({ message: "Created Movie Successfully!", movies:result, status: 1 });
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
    }
    res.json({ movies: movie, status: 1 });
  } catch (err) {
    next(err);
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
    }
    const movie: any = await Movie.findById(req.params.id);
    if (!movie) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
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
  } catch (err) {
    next(err);
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
    }
    res.json({
      message: "Delete Movie Successfully!",
      movies:movie,
      status: 1,
    });
  } catch (err) {
    next(err);
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
  } catch (err) {
    next(err);
  }
};

