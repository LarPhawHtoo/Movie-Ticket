import mongoose,{ Schema, model } from 'mongoose';

const passwordResetSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  }
);

export default model("PasswordReset", passwordResetSchema)
//export default mongoose.models['PasswordReset'] || mongoose.model('PasswordReset', passwordResetSchema);
//module.exports = mongoose.models['PasswordReset'] || mongoose.model('PasswordReset', passwordResetSchema)
