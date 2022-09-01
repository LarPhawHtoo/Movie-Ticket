"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    code: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cinema_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cinema",
        autopopulate: true
    },
    time: {
        type: [String],
        required: true
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
movieSchema.plugin(require('mongoose-autopopulate'));
exports.default = (0, mongoose_1.model)("Movie", movieSchema);
