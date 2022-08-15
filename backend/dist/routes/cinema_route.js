"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CinemaController_1 = require("../controllers/CinemaController");
const express_validator_1 = require("express-validator");
const cinema_service_1 = require("../services/cinema.service");
const router = express_1.default.Router();
router
    .route("/")
    .get(CinemaController_1.getCinema)
    .post([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Cinema Name must not be empty"),
], CinemaController_1.createCinema);
router
    .route("/search")
    .post(cinema_service_1.findByIdService);
router
    .route("/:id")
    .get(CinemaController_1.findCinema)
    .put([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Cinema Name must not be empty"),
], CinemaController_1.updateCinema)
    .delete(CinemaController_1.deleteCinema);
exports.default = router;
