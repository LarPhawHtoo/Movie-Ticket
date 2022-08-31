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
exports.getTicketByCinemaId = exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.findTicket = exports.getTicket = exports.getdashBoard = void 0;
const ticket_service_1 = require("../services/ticket.service");
const getdashBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ticket_service_1.getdashBoardata)(req, res, next);
});
exports.getdashBoard = getdashBoard;
const getTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ticket_service_1.getTicketService)(req, res, next);
});
exports.getTicket = getTicket;
const findTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ticket_service_1.findTicketService)(req, res, next);
});
exports.findTicket = findTicket;
const createTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ticket_service_1.createTicketService)(req, res, next);
});
exports.createTicket = createTicket;
const updateTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ticket_service_1.updateTicketService)(req, res, next);
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ticket_service_1.deleteTicketService)(req, res, next);
});
exports.deleteTicket = deleteTicket;
const getTicketByCinemaId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ticket_service_1.getTicketByCinemaIdService)(req, res, next);
});
exports.getTicketByCinemaId = getTicketByCinemaId;
