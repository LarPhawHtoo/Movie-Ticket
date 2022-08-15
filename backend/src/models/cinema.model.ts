import { Schema, model } from "mongoose";

const cinemaSchema = new Schema({
  name: {
    type: String,
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