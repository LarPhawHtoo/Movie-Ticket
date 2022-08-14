"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const seatSchema = new mongoose_1.Schema({
    seatNumber: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    cinema_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
//export default mongoose.models['Seat'] || mongoose.model('Seat', seatSchema);
//module.exports = mongoose.models['Seat'] || mongoose.model('Seat', seatSchema)
exports.default = (0, mongoose_1.model)("Seat", seatSchema);
//module.exports = mongoose.models.Seat || mongoose.model('Seat', seatSchema);
//const Seat= module.exports = model("Seat", seatSchema)
