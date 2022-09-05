import { Request, Response, NextFunction } from "express";
import Cinema from '../models/cinema.model';
import { Result, validationResult } from "express-validator";
import { logger } from "../logger/logger"

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
    logger.info("Successfully retrieved Cinema Data");
  } catch (err) {
    next(err);
    logger.error("Data Not Found!");
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
      logger.error("Validation failed!");
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
    logger.info("Cinema Created Successfully!");
  } catch (err) {
    next(err);
    logger.error("Cinema Failed to Create");
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

      logger.error("Not Found!");
      throw error;
    }
    res.json({ data: cinema, status: 1 });
    logger.info("Success!");
  } catch (err) {
    next(err);
    logger.error("Not Found!");
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
      logger.error("Validation failed!");
      throw error;
    }
    const cinema: any = await Cinema.findById(req.params.id);
    if (!cinema) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      logger.error("Not Found!");
      throw error;
    }
    cinema.name = req.body.name;
    cinema.date = req.body.date;
    cinema.time = req.body.time;
    cinema.created_user_id = req.body.created_user_id;
    cinema.updated_user_id = req.body.updated_user_id;
    const result = await cinema.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
    logger.info("Updated Successfully!");
  } catch (err) {
    next(err);
    logger.error("Failed to update");
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
      logger.error("Not Found!");
      throw error;
    }
  
    res.sendStatus(204);
    res.json({
      message: "Delete Cinema Successfully!",
      cinemas:cinema,
      status: 1,
    });
    logger.info("Delete Cinema Successfully!");
  } catch (err) {
    next(err);
    logger.error("Error deleting");
  }
};

//export const findByIdService = async (
//  req: any,
//  res: Response,
//  next: NextFunction
//) => {
//  try {
//    const cinemas = await Cinema.findById(req.params.id);
//    res.json({ data: cinemas, status: 1 });
//    logger.info("Successfully found cinema")
//  } catch (err) {
//    next(err);
//    logger.error("Failed to find cinema");
//  }
//}