"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SaleController_1 = require("../controllers/SaleController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router
    .route('/')
    .get(SaleController_1.getSale)
    .post([
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("customer_name").notEmpty().withMessage("customer_name of number must not be empty"),
    (0, express_validator_1.body)("cinema_id").notEmpty().withMessage("cinema of number must not be empty"),
    (0, express_validator_1.body)("seat_id").notEmpty().withMessage("seat of number must not be empty")
], SaleController_1.createSale);
router
    .route("/:id")
    .get(SaleController_1.findSale)
    .put([
    (0, express_validator_1.body)("date").notEmpty().withMessage("date must not be empty"),
    (0, express_validator_1.body)("saleNumber").notEmpty().withMessage("Sale of number must not be empty")
], SaleController_1.updateSale)
    .delete(SaleController_1.deleteSale);
exports.default = router;
