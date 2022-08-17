import mongoose, { Schema, model } from 'mongoose';

const seatSchema = new Schema({
  seatNumber: {
    type: String,
    required:true
  },
  status: {
    type: String,
    required:true
  },
  cinema_id: {
    type: Schema.Types.ObjectId,
    ref: "Cinema",
    autopopulate: true
  },
  price: {
    type: Number,
    required:true
  }
});
export default model("Seat", seatSchema);
