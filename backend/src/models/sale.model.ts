import { Schema, model } from "mongoose";

const saleSchema = new Schema({
  customer_name: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  seat_id: {
    type: Number,
    required: true,
    autopopulate: true,
    ref: "seat"
  },

  seats_status: {
    type: String,
    required: true
  },
  cinema_id: {
    type: Number,
    required: true,
    autopopulate: true,
    ref: "cinema"
  },
  created_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  },
  updated_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  },
  deleted_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  deleted_at: {
    type: Date
  },
},
  {
    timestamps: true
  }
);

saleSchema.plugin(require('mongoose-autopopulate'));
export default model("Sale", saleSchema)