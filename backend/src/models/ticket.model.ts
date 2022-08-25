import mongoose,{ Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  customer_name: {
    type: String,
    required: true
  },
  cinema_id: {
    type: Schema.Types.ObjectId,
    ref: "Cinema",
    autopopulate: true
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    autopopulate: true
  },
  seatNumber: {
    type: [String],
    required:true
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    required:true
  },
  date: {
    type: String,
    required:true
  },
  time: {
    type: [String],
    required:true
  }
});
export default model("Ticket", ticketSchema);

