import mongoose, { Schema, model } from 'mongoose';

const seatSchema = new Schema({
  seatNumber: {
    type: [String],
    required:true
  },
  status: {
    type: String,
    required:true
  },
  cinema_id: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required:true
  }
});
//export default mongoose.models['Seat'] || mongoose.model('Seat', seatSchema);
//module.exports = mongoose.models['Seat'] || mongoose.model('Seat', seatSchema)
export default model("Seat", seatSchema);
//module.exports = mongoose.models.Seat || mongoose.model('Seat', seatSchema);

//const Seat= module.exports = model("Seat", seatSchema)