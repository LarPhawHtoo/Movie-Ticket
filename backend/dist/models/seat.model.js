"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const seatSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("Seat", seatSchema);
const Seat = module.exports = (0, mongoose_1.model)("Seat", seatSchema);
//module.exports.reserveSeat = function ({seats, personInfo}, callback) {
//  Seat.updateMany({_id: {$in: seats}},{isReserved: true, personInfo: personInfo}, callback);
//};
//
//module.exports.addMany = function (seatsArr, callback) {
//  Seat.insertMany(seatsArr, callback);
//}
