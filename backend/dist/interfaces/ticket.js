"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatAvailability = void 0;
var SeatAvailability;
(function (SeatAvailability) {
    SeatAvailability["empty"] = "empty";
    SeatAvailability["reversed"] = "reversed";
    SeatAvailability["locked"] = "locked";
})(SeatAvailability = exports.SeatAvailability || (exports.SeatAvailability = {}));
