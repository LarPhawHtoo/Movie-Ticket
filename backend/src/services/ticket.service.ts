import { Request, Response, NextFunction } from 'express';
import Ticket from '../models/ticket.model';
import Movie from '../models/movie.model';
import Cinema from '../models/cinema.model';
import Seat from '../models/seat.model';
import { MovieCreate } from '../interfaces/movie';
import { validationResult } from 'express-validator';
import {TicketCreate,SeatAvailability} from '../interfaces/ticket';

export const getTicketService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   const ticket = await Ticket.find();
  
    if (!ticket) {
      res.json({
        success: false,
        message: "An error occured while fetching seats: " ,
      });
    } else {
      res.json({
        success: true,
        message: "Tickets fetched",
        tickets: ticket,
        status: 1,
      });
    }
  }

/**
 * create seat sold service
 * @param req
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
    }
    const ticketTdo: TicketCreate = {
      customer_name: req.body.customer_name,
      seatNumber: req.body.seatNumber,
      status: req.body.status,
      cinema_id: req.body.cinema_id,
      movie_id: req.body.movie_id,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time
    };
    const ticket = new Ticket(ticketTdo);
    const result = await ticket.save();
    res.status(201).json({
      message: "Created Ticket successfully!",
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
 export const findTicketService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    console.log('req-params-id', req.params.id);
    if (!ticket) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ data: ticket, status: 1 });
  } catch (err) {
    next(err);
  }
};

//Update ticket service
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
    }
    const ticket: any = await Ticket.findById(req.params.id);
    if (!ticket) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    ticket.customer_name = req.body.customer_name;
    ticket.seatNumber = req.body.seat_number;
    ticket.status = req.body.status;
    ticket.cinema_id = req.body.cinema_id;
    ticket.movie_id = req.body.movie_id;
    ticket.price = req.body.price;
    ticket.date = req.body.date;
    ticket.time = req.body.time;
    const result = await ticket.save();
    res.json({
      message: "Updated Ticket Successfully!",
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
    }
    ticket.deleted_at = new Date();
    const result = await ticket.save();
    res.json({ message: "Delete Ticket Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

/**
 * Get Seat Number by Cinema Id
 * @
*/

export const getTicketByCinemaIdService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cinemas = await Cinema.findById(req.params.cinema_id);
    console.log(cinemas);
    const tickets = await Ticket.findById({ cinema_id:req.params.cinema_id});
    console.log(tickets);
    if (!tickets) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    //var sortedSeat = tickets.sort((a, b) => (a.seatNumber < b.seatNumber ? -1 : 1));
    res.json({ tickets: tickets, status: 1 });
  } catch (err) {
    next(err);
  }
};
