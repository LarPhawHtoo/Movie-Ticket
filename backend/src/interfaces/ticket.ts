export interface TicketCreate {
  customer_name: String;
  cinema_id: String;
  movie_id: String;
  seatNumber: String;
  status: SeatAvailability;
  price: Number;
  date: String;
  time: String;
}
export enum SeatAvailability {
  availability = "availability",
  booking = "booking",
  soldOut = "sold out",
}