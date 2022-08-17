import { Request, Response, NextFunction, request } from 'express';
import {
  getSeatService, createSeatService, updateSeatService, deleteSeatService,findSeatService,getSeatByCinemaIdService
} from '../services/seat.service';

export const getSeats = async (
  req: Request, res: Response, next: NextFunction) => {
  getSeatService(req, res, next);
};
export const findSeat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findSeatService(req, res, next);
}
export const createSeat = async (
  req: Request, res: Response, next: NextFunction) => {
  createSeatService(req, res, next);
};

export const updateSeat = async (
  req: Request, res: Response, next: NextFunction) => {
  updateSeatService(req, res, next);
};

export const deleteSeat = async (
  req: Request, res: Response, next: NextFunction) => {
  deleteSeatService(req, res, next);
}

export const getSeatByCinemaId = async (
  req: Request, res: Response, next: NextFunction) => {
 getSeatByCinemaIdService(req, res, next);
}


 