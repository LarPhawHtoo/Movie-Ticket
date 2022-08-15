"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cinemaSchema = new mongoose_1.Schema({
    name: {
        type: String,
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
cinemaSchema.plugin(require('mongoose-autopopulate'));
exports.default = (0, mongoose_1.model)("Cinema", cinemaSchema);
