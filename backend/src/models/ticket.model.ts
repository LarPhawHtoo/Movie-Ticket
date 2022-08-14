import mongoose,{ Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  seatNumber: {
    type: [String],
    required:true
  },
  cinema_id: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required:true
  },
  status: {
    type: String,
    required:true
  }
});
export default mongoose.models['Ticket'] || mongoose.model('Ticket', ticketSchema);
//module.exports = mongoose.models['Ticket'] || mongoose.model('Ticket', ticketSchema)
//export default model("Ticket", ticketSchema);
//module.exports = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
//const Ticket = module.exports = model("Ticket", ticketSchema)
