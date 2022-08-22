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
  price: {
    type: Number,
    required:true
  }
});
export default model("Seat", seatSchema);
