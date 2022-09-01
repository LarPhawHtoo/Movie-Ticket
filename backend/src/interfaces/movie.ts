export interface MovieCreate {
  code: Number;
  name: string;
  year: Number;
  rating: Number;
  image: string;
  cinema_id: string;
  time: [string];
  status: string;
  created_user_id: any;
}