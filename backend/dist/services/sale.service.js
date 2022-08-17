"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSeatService = exports.updateSaleService = exports.findSaleService = exports.createSaleService = exports.getSaleService = void 0;
const sale_model_1 = __importDefault(require("../models/sale.model"));
const express_validator_1 = require("express-validator");
/**
 * get seat service
 * @param _req
 * @param res
 * @param next
 */
const getSaleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    sale_model_1.default.find(req.body.sales, (err, sales) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while fetching sales: " + err,
            });
        }
        else {
            res.json({
                success: true,
                message: "Seats fetched",
                sales: sales,
                status: 1,
            });
        }
    });
});
exports.getSaleService = getSaleService;
/**
 * create sale service
 * @param _req
 * @param res
 * @param next
 */
const createSaleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        ;
        const saleTdo = {
            customer_name: req.body.customer_name,
            time: req.body.time,
            date: req.body.date,
            status: req.body.status,
            cinema_id: req.body.cinema_id,
            seat_id: req.body.seat_id,
            created_user_id: req.body.created_user_id,
        };
        const sale = new sale_model_1.default(saleTdo);
        const result = yield sale.save();
        res.status(201).json({
            message: "Created Seat successfully!",
            data: result,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createSaleService = createSaleService;
/**
 * find seat service
 * @param req
 * @param res
 * @param next
 */
const findSaleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = yield sale_model_1.default.findById(req.params.id);
        if (!sale) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ data: sale, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findSaleService = findSaleService;
/**
 * Update seat service
 * @param req
 * @param res
 * @param next
 */
const updateSaleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        const sale = yield sale_model_1.default.findById(req.params.id);
        if (!sale) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        sale.seatNumber = req.body.seatNumber;
        sale.status = req.body.status;
        sale.cinema_id = req.body.cinema_id;
        const result = yield sale.save();
        res.json({
            message: "Updated Seat Successfully!",
            data: result,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSaleService = updateSaleService;
/**
 * delete seat service
 * @param req
 * @param res
 * @param next
 */
const deleteSeatService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = yield sale_model_1.default.findByIdAndRemove(req.params.id);
        if (!sale) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        sale.deleted_at = new Date();
        const result = yield sale.save();
        res.json({ message: "Delete Seat Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSeatService = deleteSeatService;
