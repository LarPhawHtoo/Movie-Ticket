import { Request, Response, NextFunction } from "express";
import Cinema from '../models/cinema.model';
import { Result, validationResult } from "express-validator";

/**
 * get post service.
 * @param _req 
 * @param res 
 * @param next 
 */
export const getCinemaService = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let condition: any = { deleted_at: null };
    const cinemas = await Cinema.find(condition);
    res.json({ data: cinemas, status: 1 });
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
 export const createCinemaService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 401;
      throw error;
    }
    const cinemaList = req.body; 
    const body = {
      name: req.body.name
    }
    const cinema: any = new Cinema(cinemaList);
    const result = await cinema.save();
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const findCinemaService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ data: cinema, status: 1 });
  } catch (err) {
    next(err);
  }
}

export const updateCinemaService = async (
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
    const cinema: any = await Cinema.findById(req.params.id);
    if (!cinema) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    cinema.name = req.body.name;
    cinema.date = req.body.date;
    cinema.time = req.body.time;
    cinema.created_user_id = req.body.created_user_id;
    cinema.updated_user_id = req.body.updated_user_id;
    const result = await cinema.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const deleteCinemaService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const cinema: any = await Cinema.findByIdAndRemove(req.params.id);
    if (!cinema) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    //cinema.deleted_at = new Date();
    //await cinema.save();
    res.sendStatus(204);
    res.json({
      message: "Deleted Cinema Successfully",
    });
    res.json({
      message: "Delete Movie Successfully!",
      cinemas:cinema,
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
    const cinemas = await Cinema.findById(req.params.id);
    res.json({ data: cinemas, status: 1 });
  } catch (err) {
    next(err);
  }
}