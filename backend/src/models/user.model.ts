import mongoose,{ Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  },
  phone: {
    type: String,
    default: ""
  },
  dob: {
    type: Date,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  profile: {
    type: String,
    default: ""
  },
  created_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  updated_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  deleted_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  deleted_at: {
    type: Date
  },
},
  {
    timestamps: true
  }
);
export default model("User", userSchema);
