import { Request, Response, NextFunction } from 'express';
import Movie from '../models/movie.model';
import Cinema from "../models/cinema.model";
import Seat from "../models/seat.model";
import { SeatCreate } from '../interfaces/seat';
import { validationResult } from 'express-validator';
import { deleteFile } from '../utils/utils';
import { MovieCreate } from '../interfaces/movie';

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
    const userType = _req.headers['userType'];
    const userId = _req.headers['userId'];
    let condition: any = { deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
      condition.updated_user_id = userId;
    }
    const movies = await Movie.find(condition);
    res.json({ data: movies, status: 1 });
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
export const createMovieService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 401;
      throw error;
    }
    let profile: string = req.body.profile;
    if (req.file) {
      profile = req.file.path.replace("\\", "/");
    }
    const movieTdo: MovieCreate = {
      movie_id: req.body.movie_id,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating,
      cinema_id: req.body.cinema_id,
      time: req.body.time,
      profile: profile,
      created_user_id: req.body.created_user_id,
    }
    const movie = new Movie(movieTdo);
    const result = await movie.save();
    res
      .status(201)
      .json({ message: "Created Movie Successfully!", data:result, status: 1 });
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
    res.json({ data: movie, status: 1 });
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
    let profile: string = req.body.profile;
    if (req.file) {
      profile = req.file.path.replace("\\", "/");
      if (movie.profile && movie.profile != profile) {
        deleteFile(movie.profile);
      }
      if (profile) {
        movie.profile = profile;
      }
    }
    movie.code = req.body.code;
    movie.name = req.body.name;
    movie.year = req.body.year;
    movie.rating = req.body.rating;
    movie.created_user_id = req.body.created_user_id;
    movie.updated_user_id = req.body.updated_user_id;
    const result = await movie.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
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
    movie.deleted_at = new Date();
    await movie.save();
    res.sendStatus(204)
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
    const page: any = req.query.page || 0;
    const moviesPerPage: any = req.query.ppp || 5;

    const userType = req.headers['userType'];
    const userId = req.headers['userId'];
    let condition: any = { userId: { '$regex': req.params.userId, '$options': 'i' }, deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
    }
    const movies = await Movie.find(condition).skip(page * moviesPerPage).limit(moviesPerPage);
    res.json({ data: movies, status: 1 });
  } catch (err) {
    next(err);
  }
};

