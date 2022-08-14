import { Schema, model } from "mongoose";

const cinemaSchema = new Schema({
  code: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date : {
    type: Date,
    required: true
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

cinemaSchema.plugin(require('mongoose-autopopulate'));
export default model("Cinema", cinemaSchema)