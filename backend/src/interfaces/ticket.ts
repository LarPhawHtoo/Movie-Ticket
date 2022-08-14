//export interface TicketSold{
//  seatNumber: [String];
//  status: String;
//  cinema_id: String;
//  price:Number;
//}
//
//export interface TicketBook{
//  seatNumber: [String];
//  status: String;
//  cinema_id: String;
//  price:Number;
//}
//
//export interface TicketAvailable{
//  seatNumber: [String];
//  status: String;
//  cinema_id: String;
//  price:Number;
//}
//export interface MoviesInterface{
//  movie_id: String;
//  code:Number;
//  name: String;
//  year: Number;
//  rating: Number;
//  profile: string;
//  cinema_id: String;
//  time: [string];
//}

export interface CinemasInterface{
  cinema_id: string;
  cinema_name: string;
  bookings:Array<BookingsInterface>;
}

export interface BookingsInterface {
  movie_id: String;
  seats: Array<SeatInterface>;
}
export interface SeatInterface {
  seatNumber: String;
  status: SeatAvailability;
  price: Number;
}
export enum SeatAvailability {
  empty = "empty",
  reversed = "reversed",
  locked = "locked",
}