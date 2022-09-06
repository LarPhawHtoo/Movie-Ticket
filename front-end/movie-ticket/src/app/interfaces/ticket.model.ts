export interface Ticket {
  customer_name: string,
  seatNumber: [],
  movie_id: {
    name: string
  },
  cinema_id: {
    name: string
  },
  price: number,
  date: string,
  time: string,
  status: string,
  createdUserId: string
}