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
exports.deleteCinema = exports.updateCinema = exports.findCinema = exports.createCinema = exports.getCinema = void 0;
const cinema_service_1 = require("../services/cinema.service"); //to add the service route file
const getCinema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cinema_service_1.getCinemaService)(req, res, next);
});
exports.getCinema = getCinema;
const createCinema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cinema_service_1.createCinemaService)(req, res, next);
});
exports.createCinema = createCinema;
const findCinema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cinema_service_1.findCinemaService)(req, res, next);
});
exports.findCinema = findCinema;
const updateCinema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cinema_service_1.updateCinemaService)(req, res, next);
});
exports.updateCinema = updateCinema;
const deleteCinema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cinema_service_1.deleteCinemaService)(req, res, next);
});
exports.deleteCinema = deleteCinema;
//export const findById = async(
//  req: any,
//  res: Response,
//  next: NextFunction
//) => {
//  findByIdService(req, res, next);
//}
