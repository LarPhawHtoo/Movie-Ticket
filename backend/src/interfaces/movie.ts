export interface MovieCreate {
  //code: Number;
  movie_id: string;
  name: string;
  year: Number;
  rating: Number;
  profile: string;
  cinema_id: string;
  time: [string];
  created_user_id: any;
}