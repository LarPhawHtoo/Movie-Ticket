import { Request, Response, NextFunction } from 'express'
import {
  getMovieService,
  createMovieService,
  findMovieService,
  updateMovieService,
  deleteMovieService,
  findByIdService
} from '../services/movie.service';


export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getMovieService(req, res, next);
};

export const createMovie = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  createMovieService(req, res, next);
}

export const findMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findMovieService(req, res, next);
}

export const updateMovie = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  updateMovieService(req, res, next);
};

export const deleteMovie = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  deleteMovieService(req, res, next);
};

export const findById = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  findByIdService(req, res, next);
}