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
    required: true,
    autopopulate: true,
    ref:"Cinema",
  },
  price: {
    type: Number,
    required:true
  }
  
},
{
  timestamps: true
  }
);
export default model("Seat", seatSchema);