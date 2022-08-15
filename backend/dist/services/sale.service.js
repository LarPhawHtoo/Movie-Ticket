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
exports.findByIdService = exports.deleteSaleService = exports.updateSaleService = exports.findSaleService = exports.createSaleService = exports.getSaleService = void 0;
const sale_model_1 = __importDefault(require("../models/sale.model"));
const express_validator_1 = require("express-validator");
/**
 * get post service.
 * @param _req
 * @param res
 * @param next
 */
const getSaleService = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = _req.query.page || 0;
        const salesPerPage = _req.query.pageSize || 5;
        const userType = _req.headers['userType'];
        const userId = _req.headers['userId'];
        let condition = { deleted_at: null };
        if (userType === "User") {
            condition.created_user_id = userId;
            condition.updated_user_id = userId;
        }
        const sales = yield sale_model_1.default.find(condition).skip(page * salesPerPage).limit(salesPerPage);
        res.json({ data: sales, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.getSaleService = getSaleService;
/**
 * create post service
 * @param req
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
        const saleList = req.body;
        const result = yield sale_model_1.default.insertMany(saleList);
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createSaleService = createSaleService;
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
            error.statusCode = 404;
            throw error;
        }
        sale.customer_name = req.body.customer_name;
        sale.date = req.body.date;
        sale.time = req.body.time;
        sale.seat_id = req.body.seat_id;
        sale.cinema_id = req.body.cinema_id;
        sale.created_user_id = req.body.created_user_id;
        sale.updated_user_id = req.body.updated_user_id;
        const result = yield sale.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSaleService = updateSaleService;
const deleteSaleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = yield sale_model_1.default.findByIdAndRemove(req.params.id);
        if (!sale) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        sale.deleted_at = new Date();
        yield sale.save();
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSaleService = deleteSaleService;
const findByIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 0;
        const salesPerPage = req.query.ppp || 5;
        const userType = req.headers['userType'];
        const userId = req.headers['userId'];
        let condition = { userId: { '$regex': req.params.userId, '$options': 'i' }, deleted_at: null };
        if (userType === "User") {
            condition.created_user_id = userId;
        }
        const sales = yield sale_model_1.default.find(condition).skip(page * salesPerPage).limit(salesPerPage);
        res.json({ data: sales, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findByIdService = findByIdService;
