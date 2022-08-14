import { Request, Response, NextFunction } from "express";
import Cinema from '../models/cinema.model';
import { validationResult } from "express-validator";

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
    const page: any = _req.query.page || 0;
    const cinemasPerPage: any = _req.query.pageSize || 5;

    const userType = _req.headers['userType'];
    const userId = _req.headers['userId'];
    let condition: any = { deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
      condition.updated_user_id = userId;
    }
    const cinemas = await Cinema.find(condition).skip(page * cinemasPerPage).limit(cinemasPerPage);
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
    const result: any = await Cinema.insertMany(cinemaList);
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
    cinema.code = req.body.code;
    cinema.name = req.body.name;
    cinema.location = req.body.location;
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
    cinema.deleted_at = new Date();
    await cinema.save();
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
    const cinemasPerPage: any = req.query.ppp || 5;

    const userType = req.headers['userType'];
    const userId = req.headers['userId'];
    let condition: any = { userId: { '$regex': req.params.userId, '$options': 'i' }, deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
    }
    const cinemas = await Cinema.find(condition).skip(page * cinemasPerPage).limit(cinemasPerPage);
    res.json({ data: cinemas, status: 1 });
  } catch (err) {
    next(err);
  }
}