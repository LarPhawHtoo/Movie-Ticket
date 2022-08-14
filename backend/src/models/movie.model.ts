import mongoose,{ Schema, model } from 'mongoose';

const movieSchema = new Schema({
  //code: {
  //  type: Number,
  //  required:true
  //},
  movie_id: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required:true
  },
  profile: {
    type: String,
    default:""
  },
  cinema_id: {
    type: String,
    required:true
  },
  time: {
    type: [String],
    required:true
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

movieSchema.plugin(require('mongoose-autopopulate'));
export default model("Movie", movieSchema);
//export default mongoose.models['Movie'] || mongoose.model('Movie', movieSchema);
//module.exports = mongoose.models['Movie'] || mongoose.model('Movie', movieSchema)