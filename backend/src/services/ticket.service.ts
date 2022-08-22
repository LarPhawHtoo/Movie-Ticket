import { Request, Response, NextFunction } from "express";
import Ticket from "../models/ticket.model";
import Cinema from "../models/cinema.model";
import Seat from "../models/seat.model";
import { TicketCreate, dataInterface } from "../interfaces/ticket";
import { validationResult } from "express-validator";
import { deleteFile } from "../utils/utils";
import ticketModel from "../models/ticket.model";
import { getCinema } from "../controllers/cinemaController";
import cinemaModel from "../models/cinema.model";
import { SeatCreate } from "../interfaces/seat";
import { StreamState } from "http2";
import { stat } from "fs";

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
  Ticket.find(req.body.tickets, (err, tickets) => {
    if (err) {
      res.json({
        success: false,
        message: "An error occured while fetching tickets: " + err,
      });
    } else {
      var sortedTicket = tickets.sort((a, b) =>
        a.seatNumber < b.seatNumber ? -1 : 1
      );
      res.json({
        success: true,
        message: "Tickets fetched",
        tickets: sortedTicket,
        status: 1,
      });
    }
  });
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
    }
    const ticketTdo: TicketCreate = {
      customer_name: req.body.customer_name,
      cinema_id: req.body.cinema_id,
      movie_id: req.body.movie_id,
      seatNumber: req.body.seatNumber,
      price: req.body.price,
      status: req.body.status,
    };
    const ticket = new Ticket(ticketTdo);
    const result = await ticket.save();
    res.status(201).json({
      message: "Created Ticket successfully!",
      tickets: result,
      status: 1,
    });
  } catch (err) {
    next(err);
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
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ tickets: ticket, status: 1 });
  } catch (err) {
    next(err);
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
    }
    const ticket: any = await Ticket.findByIdAndUpdate(req.params.id);
    if (!ticket) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    ticket.customer_name = req.body.customer_name;
    ticket.cinema_id = req.body.cinema_id;
    ticket.movie_id = req.body.movie_id;
    ticket.seatNumber = req.body.seatNumber;
    ticket.price = req.body.price;
    ticket.status = req.body.status;
    const result = await ticket.save();
    res.json({
      message: "Updated Ticket Successfully!",
      tickets: result,
      status: 1,
    });
  } catch (err) {
    next(err);
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
    }
    res.json({
      message: "Delete Ticket Successfully!",
      tickets:ticket,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * get Ticket by Cinema Id service
 * @param req
 * @param res
 * @param next
 */
export const getdashBoardata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
     const cinema = await Cinema.findById(req.params.cinema_id);
     console.log(cinema);
     const ticket = await Ticket.find({ cinema_id: cinema?._id });
     const seats = await Seat.find();
     let seatingList: any = [];
     for (let i = 0; i < seats.length; i++){
       const filter = ticket.find((ticket) => ticket.seatNumber?.findIndex((number) => number === seats[i].seatNumber) !== -1);
       let data = {};
       if (filter && filter !== undefined) {
         data = {
           seatNumber: seats[i].seatNumber,
           status: filter.status,
         };
       } else {
         data = {
           seatNumber: seats[i].seatNumber,
           status: "Available",
         };
       }
       seatingList.push(data);
     }
     var sortedStatus = seatingList.sort((a, b) => a.status < b.status ? -1 : 1);
     console.log(sortedStatus);
     let firstName = "";
     let result: any = [];
     let firstArrIndex = 0;
     for (let i = 0; i < sortedStatus.length; i++){
      if (i === 0) {
        result[firstArrIndex] = [sortedStatus[i]];
        firstName = sortedStatus[i].status[0];
      } else if (sortedStatus[i].status.indexOf(firstName) === -1) {
        firstArrIndex += 1;
        firstName = sortedStatus[i].status[0];
        result[firstArrIndex] = [sortedStatus[i]];
      } else {
        result[firstArrIndex] = [...result[firstArrIndex], sortedStatus[i]];
      }
     }
      
    if (!result) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ tickets: result, status: 1 });
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
    console.log(cinema);
    const tickets: any = await Ticket.find({ cinema_id: cinema?._id });
    const seats: any = await Seat.find();
    console.log(seats);

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
        };
      } else {
        data = {
          seatNumber: seats[i].seatNumber,
          status: "available",
        };
      }
      //console.log('data', data);
      seatingPlan.push(data);
    }

    //console.log('plan', seatingPlan);

    var sortedSeat = seatingPlan.sort((a: any, b: any) =>
      a.seatNumber < b.seatNumber ? -1 : 1
    );
    //console.log(sortedSeat);

    let firstName = "";
    let result: any= [];
    let firstArrIndex = 0;

    for (let i = 0; i < sortedSeat.length; i++) {
      if (i === 0) {
        //console.log('result', result);
        result[firstArrIndex]=[sortedSeat[i]];
        firstName = sortedSeat[i].seatNumber[0];
        //console.log('after result', result);
      } else if (sortedSeat[i].seatNumber.indexOf(firstName) === -1) {
        firstArrIndex += 1;
        //console.log('result', result);
        firstName = sortedSeat[i].seatNumber[0];
        result[firstArrIndex] = [sortedSeat[i]];
        //console.log('after result', result);
      } else {
        //console.log('result', result);
        result[firstArrIndex] = [...result[firstArrIndex], sortedSeat[i]];
        //console.log('after result', result);
      }
    }
    if (!result) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ tickets: result, status: 1 });
  } catch (err) {
    next(err);
  }
};
