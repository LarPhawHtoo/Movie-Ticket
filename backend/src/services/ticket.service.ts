import { Request, Response, NextFunction } from "express";
import Ticket from "../models/ticket.model";
import Cinema from "../models/cinema.model";
import Seat from "../models/seat.model";
import Movie from "../models/movie.model";
import { TicketCreate } from "../interfaces/ticket";
import { param, validationResult } from "express-validator";
import { deleteFile } from "../utils/utils";
import { getCinema } from "../controllers/cinema.controller";
import { SeatCreate } from "../interfaces/seat";
import { StreamState } from "http2";
import { stat } from "fs";
import { AnyAaaaRecord } from "dns";
import { getMovieService } from "./movie.service";
import { logger } from "../logger/logger";
/**
 * get tickets service
 * @param _req
 * @param res
 * @param next
 */

export const getTicketService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets: any = await Ticket.find();
    if (!tickets) {
      res.json({
        success: false,
        message: "Not Found! ",
      });
      logger.error("Tickets Not Found!");
    }
    var sortedTicket = tickets.sort((a, b) =>
      a.seatNumber < b.seatNumber ? -1 : 1
    );
    res.json({
      success: true,
      message: "Tickets fetched",
      tickets: sortedTicket,
      status: 1,
    });
    logger.info("Tickets fetched successfully");
  } catch (err) {
    next(err);
    logger.error("Error fetching tickets");
  }
};

/**
 * create ticket service
 * @param _req
 * @param res
 * @param next
 */
export const createTicketService = async (
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
      logger.error("Validation failed");
    }
    const ticketTdo: TicketCreate = {
      customer_name: req.body.customer_name,
      cinema_id: req.body.cinema_id,
      movie_id: req.body.movie_id,
      seatNumber: req.body.seatNumber,
      price: req.body.price,
      status: req.body.status,
      date: req.body.date,
      time: req.body.time,
      created_user_id: req.body.created_user_id,
    };
    const ticket = new Ticket(ticketTdo);
    const result = await ticket.save();
    res.status(201).json({
      message: "Created Ticket successfully!",
      tickets: result,
      status: 1,
    });
    logger.info("Created Ticket successfully!");
  } catch (err) {
    next(err);
    logger.error("Failed to create Ticket!");
  }
};
/**
 * find ticket service
 * @param req
 * @param res
 * @param next
 */
export const findTicketService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket: any = await Ticket.findById(req.params.id);
    console.log(ticket);

    if (!ticket) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
      logger.error("Not Found Ticket!");
    }
    res.json({ tickets: ticket, status: 1 });
    logger.info("Successfully found Ticket!");
  } catch (err) {
    next(err);
    logger.error("Error finding Ticket!");
  }
};

/**
 * Update ticket service
 * @param req
 * @param res
 * @param next
 */
export const updateTicketService = async (
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
    const ticket: any = await Ticket.findByIdAndUpdate(req.params.id);
    if (!ticket) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
      logger.error("Not Found!");
    }
    ticket.customer_name = req.body.customer_name;
    ticket.cinema_id = req.body.cinema_id;
    ticket.movie_id = req.body.movie_id;
    ticket.seatNumber = req.body.seatNumber;
    ticket.price = req.body.price;
    ticket.status = req.body.status;
    ticket.date = req.body.date;
    ticket.time = req.body.time;
    const result = await ticket.save();
    res.json({
      message: "Updated Ticket Successfully!",
      tickets: result,
      status: 1,
    });
    logger.info("Updated Ticket Successfully!");
  } catch (err) {
    next(err);
    logger.error("Error updating Ticket");
  }
};

/**
 * delete ticket service
 * @param req
 * @param res
 * @param next
 */
export const deleteTicketService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket: any = await Ticket.findByIdAndRemove(req.params.id);
    if (!ticket) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
      logger.error("Not Found Ticket");
    }
    res.json({
      message: "Delete Ticket Successfully!",
      tickets: ticket,
      status: 1,
    });
    logger.info("Delete Ticket Successfully!");
  } catch (err) {
    next(err);
    logger.error("Error deleting Ticket");
  }
};

/**
 * get getdashBoard service
 * @param req
 * @param res
 * @param next
 */
export const getdashBoardService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cinema: any = await Cinema.find();
    const movie = await Movie.find({ deleted_at: null });
    const tickets=await Ticket.find({ deleted_at: null });
    var resultMovie: any = [];
    for (let i = 0; i < movie.length; i++) {
      for (let j = 0; j < movie[i].time.length; j++) {
        let movieData = {
          cinema_name: movie[i].cinema_id,
          movieName: movie[i].name,
          time: movie[i].time[j],
          date: req.body.date,
          image: movie[i].image,
        };

        const seats = await Seat.find();
        let sold_out_seats: any = [];
        let available_seats: any = [];
        for (let k = 0; k < seats.length; k++) {
          const filterData = tickets.find(
            (ticket: any) =>
              ticket?.movie_id?._id.toString() === movie[i]?._id.toString() &&
              ticket?.cinema_id?._id.toString() ===
                movie[i]?.cinema_id?._id.toString() &&
              ticket.time === movie[i].time[j] &&
              ticket.seatNumber?.findIndex(
                (number) => number === seats[k].seatNumber
              ) !== -1
          );
          if (filterData) {
            sold_out_seats.push(seats[k].seatNumber);
          } else {
            available_seats.push(seats[k].seatNumber);
          }
        }
        movieData["sold_out_seats"] = sold_out_seats;
        movieData["available_seats"] = available_seats;
        resultMovie.push(movieData);
      }
    }
    if (!resultMovie) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
      logger.error("Not Found Ticket!");
    }
    res.json({ tickets: resultMovie, status: 1 });
    logger.info("Successfully got tickets");
  } catch (err) {
    next(err);
  }
};

export const getTicketByCinemaIdService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cinema = await Cinema.findById(req.params.cinema_id);
    const tickets: any = await Ticket.find({
      cinema_id: cinema?._id,
      date: req.body?.date,
      time: req.body?.time,
    });
    console.log(req.params.cinema_id);
    console.log(req.body.date);
    console.log(req.body.time);
    console.log(tickets);
    const seats: any = await Seat.find();

    let seatingPlan: any = [];

    for (let i = 0; i < seats.length; i++) {
      const filterData: any = tickets.find(
        (ticket) =>
          ticket.seatNumber?.findIndex(
            (number) => number === seats[i].seatNumber
          ) !== -1
      );

      let data = {};

      if (filterData && filterData !== undefined) {
        data = {
          seatNumber: seats[i].seatNumber,
          status: filterData.status,
          price: seats[i].price,
        };
      } else {
        data = {
          seatNumber: seats[i].seatNumber,
          status: "available",
          price: seats[i].price,
        };
      }
      seatingPlan.push(data);
    }

    var sortedSeat = seatingPlan.sort((a: any, b: any) =>
      a.seatNumber < b.seatNumber ? -1 : 1
    );

    let firstName = "";
    let result: any = [];
    let firstArrIndex = 0;

    for (let i = 0; i < sortedSeat.length; i++) {
      if (i === 0) {
        result[firstArrIndex] = [sortedSeat[i]];
        firstName = sortedSeat[i].seatNumber[0];
      } else if (sortedSeat[i].seatNumber.indexOf(firstName) === -1) {
        firstArrIndex += 1;
        firstName = sortedSeat[i].seatNumber[0];
        result[firstArrIndex] = [sortedSeat[i]];
      } else {
        result[firstArrIndex] = [...result[firstArrIndex], sortedSeat[i]];
      }
    }
    if (!result) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
      logger.error("Not found Ticket!");
    }
    res.json({ tickets: result, status: 1 });
    logger.info("Successfully got Tickets by Cinema ID!");
  } catch (err) {
    next(err);
    logger.error("Failed to get tickets!");
  }
};
