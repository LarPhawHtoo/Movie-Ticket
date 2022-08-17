"use strict";
//import { Request, Response, NextFunction } from "express";
//import Sale from "../models/sale.model";
//import { SaleCreate } from "../interfaces/Sale";
//import { validationResult } from "express-validator";
//import { deleteFile } from "../utils/utils";
//import saleModel from "../models/sale.model";
//import { ResultWithContext } from "express-validator/src/chain";
//
///**
// * get seat service
// * @param _req
// * @param res
// * @param next
// */
//export const getSaleService = async (
//  req: Request,
//  res: Response,
//  next: NextFunction
//) => {
//  Sale.find(req.body.sales, (err, sales) => {
//    if (err) {
//      res.json({
//        success: false,
//        message: "An error occured while fetching sales: " + err,
//      });
//    } else {
//     
//      res.json({
//        success: true,
//        message: "Seats fetched",
//        sales: sales,
//        status: 1,
//      });
//    }
//  });
//};
///**
// * create sale service
// * @param _req
// * @param res
// * @param next
// */
//export const createSaleService = async (
//  req: Request,
//  res: Response,
//  next: NextFunction
//) => {
//  try {
//    const errors = validationResult(req.body);
//    if (!errors.isEmpty()) {
//      const error: any = new Error("Validation failed!");
//      error.data = errors.array();
//      error.statusCode = 401;
//      throw error;
//    };
//    const saleTdo: SaleCreate = {
//      customer_name: req.body.customer_name,
//      time: req.body.time,
//      date: req.body.date,
//      status: req.body.status,
//      cinema_id: req.body.cinema_id,
//      seat_id: req.body.seat_id,
//      created_user_id: req.body.created_user_id,
//    };
//    const sale = new Sale(saleTdo);
//    const result = await sale.save();
//    res.status(201).json({
//      message: "Created Seat successfully!",
//      data: result,
//      status: 1,
//    });
//  } catch (err) {
//    next(err);
//  }
//};
///**
// * find seat service
// * @param req
// * @param res
// * @param next
// */
//export const findSaleService = async (
//  req: Request,
//  res: Response,
//  next: NextFunction
//) => {
//  try {
//    const sale = await Sale.findById(req.params.id);
//    if (!sale) {
//      const error: any = Error("Not Found!");
//      error.statusCode = 401;
//      throw error;
//    }
//    res.json({ data: sale, status: 1 });
//  } catch (err) {
//    next(err);
//  }
//};
//
///**
// * Update seat service
// * @param req
// * @param res
// * @param next
// */
//export const updateSaleService = async (
//  req: any,
//  res: Response,
//  next: NextFunction
//) => {
//  try {
//    const errors = validationResult(req.body);
//    if (!errors.isEmpty()) {
//      const error: any = new Error("Validation failed!");
//      error.data = errors.array();
//      error.statusCode = 401;
//      throw error;
//    }
//    const sale: any = await Sale.findById(req.params.id);
//    if (!sale) {
//      const error: any = new Error("Not Found!");
//      error.statusCode = 401;
//      throw error;
//    }
//    sale.seatNumber = req.body.seatNumber;
//    sale.status = req.body.status;
//    sale.cinema_id = req.body.cinema_id;
//    const result = await sale.save();
//    res.json({
//      message: "Updated Seat Successfully!",
//      data: result,
//      status: 1,
//    });
//  } catch (err) {
//    next(err);
//  }
//};
//
///**
// * delete seat service
// * @param req
// * @param res
// * @param next
// */
//export const deleteSeatService = async (
//  req: any,
//  res: Response,
//  next: NextFunction
//) => {
//  try {
//    const sale: any = await Sale.findByIdAndRemove(req.params.id);
//    if (!sale) {
//      const error: any = new Error("Not Found!");
//      error.statusCode = 401;
//      throw error;
//    }
//    sale.deleted_at = new Date();
//    const result = await sale.save();
//    res.json({ message: "Delete Seat Successfully!", data: result, status: 1 });
//  } catch (err) {
//    next(err);
//  }
//};
