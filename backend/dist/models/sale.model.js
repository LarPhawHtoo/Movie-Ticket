"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const saleSchema = new mongoose_1.Schema({
    customer_name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    seat_id: {
        type: Number,
        required: true,
        autopopulate: true,
        ref: "seat"
    },
    seats_status: {
        type: String,
        required: true
    },
    cinema_id: {
        type: Number,
        required: true,
        autopopulate: true,
        ref: "cinema"
    },
    created_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true
    },
    updated_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true
    },
    deleted_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    deleted_at: {
        type: Date
    },
}, {
    timestamps: true
});
saleSchema.plugin(require('mongoose-autopopulate'));
exports.default = (0, mongoose_1.model)("Sale", saleSchema);
