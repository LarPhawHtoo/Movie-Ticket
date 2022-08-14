import { Request, Response, NextFunction } from 'express';
//import { setFlagsFromString } from 'v8';
import Ticket from '../models/ticket.model';
import Movie from '../models/movie.model';
import { MovieCreate } from '../interfaces/movie';
import { BookingsInterface,SeatAvailability,SeatInterface,CinemasInterface } from '../interfaces/ticket';

//get all movies
//export const getMovies = async (): Promise<Array<MoviesInterface>> => {
//  const movies: any= mongodbClient.db('Movie-Ticket').collection('movies').find();
//  const moviesArray: Array<MoviesInterface> = await movies.toArray();
//  return moviesArray;
//}
export const getMovies = async () => {
  const movies: any= Movie.find();
  const moviesArray: Array<MovieCreate> = await movies.toArray();
  return moviesArray;
}

//get all cinema
//export const getCinemas = async (): Promise<Array<string>> => {
//  const bookings:any= mongodbClient.db('Movie-Ticket').collection('bookings').find();
//  const cinemasArray: Array<CinemasInterface> = await bookings.toArray();
//  const resultArray: Array<string> = [];
//  cinemasArray.forEach((item) => resultArray.push(item.cinema_name));
//  return resultArray;
//}
export const getCinemas = async ()=> {
  const bookings:any = Ticket.find();
  const cinemasArray: Array<CinemasInterface> = await bookings.toArray();
  const resultArray: Array<string> = [];
  cinemasArray.forEach((item) => resultArray.push(item.cinema_name));
  return resultArray;
}

//get seat availabilities at a cinema for a movie
export const getCinemaAvailability = async (cinemaName: string, movieId: string) => {
  const cinemaAvailability: CinemasInterface | any = await Ticket.findOne({cinema_name: cinemaName});

  if(cinemaAvailability){
      const cinemaAndMovieSelection: Array<BookingsInterface> = cinemaAvailability.bookings.filter((item: BookingsInterface) => item.movie_id == movieId);
      return cinemaAndMovieSelection[0].seats;
  }

  //throw new Error();
}

//update seat availability for a movie at a cinema

export const updateAvalability = async (
  cinemaName: string, 
  movieId: string, 
  seatNumbers: Array<string>, 
  newStatus: SeatAvailability
) => {
  const cinemaAvailability: CinemasInterface | any = await Ticket.findOne({cinema_name:cinemaName});

  if(cinemaAvailability){
      cinemaAvailability.bookings.forEach((item) => {
          if(item.movie_id == movieId){
              seatNumbers.forEach((seatNumber) => {
                  item.seats.forEach((seats) => {
                      if(seatNumber == seats.seat_number){
                          seats.status = SeatAvailability[newStatus];
                      }
                  })
              })
          }
      });

      const updateResult = await Ticket.updateOne({cinema_name: cinemaName}, {
          $set: {
          bookings: cinemaAvailability.bookings
        }
      });
      
      if(updateResult){
          return "Booking updated successfully";
      }
  }

  //throw new Error();
}


