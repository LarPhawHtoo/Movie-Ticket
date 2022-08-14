"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passwordResetSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("PasswordReset", passwordResetSchema);
//export default mongoose.models['PasswordReset'] || mongoose.model('PasswordReset', passwordResetSchema);
//module.exports = mongoose.models['PasswordReset'] || mongoose.model('PasswordReset', passwordResetSchema)
