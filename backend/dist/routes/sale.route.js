"use strict";
//import express from 'express';
//import mongoose from 'mongoose';
//import { getSale, createSale, updateSale, deleteSale,findSale } from '../controllers/sale.controller';
//import {body } from 'express-validator';
//
//const router = express.Router();
//
//router
//  .route('/')
//  .get(getSale)
//  .post([
//    body("date").notEmpty().withMessage("date must not be empty"),
//    body("customer_name").notEmpty().withMessage("customer_name of number must not be empty"),
//    body("cinema_id").notEmpty().withMessage("cinema of number must not be empty"),
//    body("seat_id").notEmpty().withMessage("seat of number must not be empty")
//  ],
//    createSale);
//
//router
//  .route("/:id")
//  .get(findSale)
//  .put(
//    [
//      body("date").notEmpty().withMessage("date must not be empty"),
//      body("saleNumber").notEmpty().withMessage("Sale of number must not be empty")
//    ],
//    updateSale)
//  .delete(deleteSale)
//export default router;
//
//
