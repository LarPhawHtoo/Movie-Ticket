"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
    customer_name: {
        type: String,
        required: true
    },
    cinema_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cinema",
        autopopulate: true
    },
    movie_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Movie",
        autopopulate: true
    },
    seatNumber: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: [String],
        required: true
    }
});
exports.default = (0, mongoose_1.model)("Ticket", ticketSchema);
