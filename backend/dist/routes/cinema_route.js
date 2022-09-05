"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cinema_controller_1 = require("../controllers/cinema.controller");
const express_validator_1 = require("express-validator");
//import { findByIdService } from '../services/cinema.service';
const router = express_1.default.Router();
router
    .route("/")
    .get(cinema_controller_1.getCinema)
    .post([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Cinema Name must not be empty"),
], cinema_controller_1.createCinema);
//router
//  .route("/search")
//  .post(findByIdService)
router
    .route("/:id")
    .get(cinema_controller_1.findCinema)
    .put([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Cinema Name must not be empty"),
], cinema_controller_1.updateCinema)
    .delete(cinema_controller_1.deleteCinema);
exports.default = router;
