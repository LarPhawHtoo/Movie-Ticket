export interface MovieCreate {
  code: Number;
  name: string;
  year: Number;
  rating: Number;
  image: string;
  date: string;
  cinema_id: string;
  time: [string];
  created_user_id: any;
}