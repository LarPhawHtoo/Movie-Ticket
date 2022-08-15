"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SaleController_1 = require("../controllers/SaleController");
const express_validator_1 = require("express-validator");
const sale_service_1 = require("../services/sale.service");
const router = express_1.default.Router();
router
    .route("/")
    .get(SaleController_1.getSale)
    .post([
    (0, express_validator_1.body)("customer_name").notEmpty().withMessage("customer_name must not be empty"),
    (0, express_validator_1.body)("time").notEmpty().withMessage("time must not be empty"),
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("seat_id").notEmpty().withMessage("seat_id must not be empty"),
    (0, express_validator_1.body)("cinema_id").notEmpty().withMessage("cinema_id must not be empty"),
], SaleController_1.createSale);
router
    .route("/search")
    .post(sale_service_1.findByIdService);
router
    .route("/:id")
    .get(SaleController_1.findSale)
    .put([
    (0, express_validator_1.body)("customer_name").notEmpty().withMessage("customer_name must not be empty"),
    (0, express_validator_1.body)("time").notEmpty().withMessage("time must not be empty"),
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("seat_id").notEmpty().withMessage("seat_id must not be empty"),
    (0, express_validator_1.body)("cinema_id").notEmpty().withMessage("cinema_id must not be empty"),
], SaleController_1.updateSale)
    .delete(SaleController_1.deleteSale);
exports.default = router;
