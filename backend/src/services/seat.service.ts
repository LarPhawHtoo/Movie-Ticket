import { Request, Response, NextFunction } from "express";
import Seat from "../models/seat.model";
import { SeatCreate } from "../interfaces/seat";
import { validationResult } from "express-validator";
import { deleteFile } from "../utils/utils";

/**
 * get seat service
 * @param _req
 * @param res
 * @param next
 */
export const getSeatService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Seat.find(req.body.seats, (err, seats) => {
    if (err) {
      res.json({
        success: false,
        message: "An error occured while fetching seats: " + err,
      });
    } else {
      var sortedSeat = seats.sort((a, b) => (a.seatNumber < b.seatNumber ? -1 : 1));
      res.json({
        success: true,
        message: "Seats fetched",
        seats: sortedSeat,
        status: 1,
      });
    }
  });
};
/**
 * create seat service
 * @param _req
 * @param res
 * @param next
 */
export const createSeatService = async (
  req: Request,
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
    const seatTdo: SeatCreate = {
      seatNumber: req.body.seatNumber,
      status: req.body.status,
      cinema_id: req.body.cinema_id,
      price: req.body.price,
    };
    const seat = new Seat(seatTdo);
    const result = await seat.save();
    res.status(201).json({
      message: "Created Seat successfully!",
      data: result,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};
/**
 * find seat service
 * @param req
 * @param res
 * @param next
 */
export const findSeatService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ data: seat, status: 1 });
  } catch (err) {
    next(err);
  }
};

/**
 * Update seat service
 * @param req
 * @param res
 * @param next
 */
export const updateSeatService = async (
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
    const seat: any = await Seat.findById(req.params.id);
    if (!seat) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    seat.seatNumber = req.body.seatNumber;
    seat.status = req.body.status;
    seat.cinema_id = req.body.cinema_id;
    seat.price = req.body.price;
    const result = await seat.save();
    res.json({
      message: "Updated Seat Successfully!",
      data: result,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * delete seat service
 * @param req
 * @param res
 * @param next
 */
export const deleteSeatService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const seat: any = await Seat.findByIdAndRemove(req.params.id);
    if (!seat) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    seat.deleted_at = new Date();
    const result = await seat.save();
    res.json({ message: "Delete Seat Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};