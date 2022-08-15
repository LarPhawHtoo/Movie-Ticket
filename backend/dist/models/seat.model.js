"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const seatSchema = new mongoose_1.Schema({
    seatNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    cinema_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        autopopulate: true,
        ref: "Cinema",
    },
    price: {
        type: Number,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("Seat", seatSchema);
