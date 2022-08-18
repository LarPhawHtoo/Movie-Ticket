export interface TicketCreate{
  customer_name: string;
  cinema_id: String;
  movie_id: String;
  seatNumber: [String];
  price: Number;
  status: String;
}

export interface dataInterface{
  seatNumber: String;
  status: String;
}

