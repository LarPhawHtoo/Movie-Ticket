import { Request, Response, NextFunction } from "express";
import { RequestOptions } from "https";
import {
  getCinemaService,
  createCinemaService,
  findCinemaService,
  updateCinemaService,
  deleteCinemaService,
  findByIdService
} from '../services/cinema.service';//to add the service route file

export const getCinema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getCinemaService(req, res, next);
};

export const createCinema = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  createCinemaService(req, res, next);
};

export const findCinema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findCinemaService(req, res, next);
};

export const updateCinema = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  updateCinemaService(req, res, next);
};

export const deleteCinema = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  deleteCinemaService(req, res, next);
};

export const findById = async(
  req: any,
  res: Response,
  next: NextFunction
) => {
  findByIdService(req, res, next);
}