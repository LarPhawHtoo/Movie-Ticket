export interface MovieCreate {
  code: Number;
  name: string;
  year: Number;
  rating: Number;
  profile: string;
  cinema_id: string;
  time: [string];
  created_user_id: any;
}