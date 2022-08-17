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
        ref: "Cinema",
        autopopulate: true
    },
    price: {
        type: Number,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("Seat", seatSchema);
