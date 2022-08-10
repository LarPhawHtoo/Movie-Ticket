import { Schema, model } from 'mongoose';

const seatSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  row: {
    type: Number,
    required: true
  },
  column: {
    type: Number,
    required: true
  },
  isReversed: {
    type: Boolean,
    default: false
  }
});
export default model("Seat", seatSchema);

const Seat= module.exports = model("Seat", seatSchema);

module.exports.reserveSeat = function ({seats, personInfo}, callback) {
  Seat.updateMany({_id: {$in: seats}},{isReserved: true, personInfo: personInfo}, callback);
};

module.exports.addMany = function (seatsArr, callback) {
  Seat.insertMany(seatsArr, callback);
}