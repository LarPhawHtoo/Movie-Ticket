import mongoose,{ Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  customer_name: {
    type: String,
    required: true
  },
  seatNumber: {
    type:[String],
    required: true
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    autopopulate: true
  },
  cinema_id: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: "Cinema"
  },
  price: {
    type: Number,
    required:true
  },
  date: {
    type: String,
    required:true
  },
  time: {
    type: String,
    required:true
  },
  status: {
    type: String,
    required:true
  }
},
{
  timestamps: true
  }
);
export default model("Ticket", ticketSchema);

