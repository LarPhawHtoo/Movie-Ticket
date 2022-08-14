"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    //code: {
    //  type: Number,
    //  required:true
    //},
    movie_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    profile: {
        type: String,
        default: ""
    },
    cinema_id: {
        type: String,
        required: true
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
//export default mongoose.models['Movie'] || mongoose.model('Movie', movieSchema);
//module.exports = mongoose.models['Movie'] || mongoose.model('Movie', movieSchema)
