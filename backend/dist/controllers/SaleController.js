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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.deleteSale = exports.updateSale = exports.findSale = exports.createSale = exports.getSale = void 0;
const sale_service_1 = require("../services/sale.service"); //to add the service route file
const getSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sale_service_1.getSaleService)(req, res, next);
});
exports.getSale = getSale;
const createSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sale_service_1.createSaleService)(req, res, next);
});
exports.createSale = createSale;
const findSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sale_service_1.findSaleService)(req, res, next);
});
exports.findSale = findSale;
const updateSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sale_service_1.updateSaleService)(req, res, next);
});
exports.updateSale = updateSale;
const deleteSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sale_service_1.deleteSaleService)(req, res, next);
});
exports.deleteSale = deleteSale;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sale_service_1.findByIdService)(req, res, next);
});
exports.findById = findById;
