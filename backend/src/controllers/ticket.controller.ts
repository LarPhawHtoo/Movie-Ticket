import { Request, Response, NextFunction, request } from 'express';
import {
  getdashBoardService, getTicketService, createTicketService, updateTicketService, deleteTicketService,findTicketService,getTicketByCinemaIdService
} from '../services/ticket.service';

export const getTickets = async (
  req: Request, res: Response, next: NextFunction) => {
    getTicketService(req, res, next);
};

export const getdashBoardData = async (
  req: Request, res: Response, next: NextFunction) => {
    getdashBoardService(req, res, next);
};
export const findTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findTicketService(req, res, next);
}
export const createTicket = async (
  req: Request, res: Response, next: NextFunction) => {
  createTicketService(req, res, next);
};

export const updateTicket = async (
  req: Request, res: Response, next: NextFunction) => {
  updateTicketService(req, res, next);
};

export const deleteTicket = async (
  req: Request, res: Response, next: NextFunction) => {
  deleteTicketService(req, res, next);
}

export const getTicketByCinemaId = async (
  req: Request, res: Response, next: NextFunction) => {
 getTicketByCinemaIdService(req, res, next);
}


 