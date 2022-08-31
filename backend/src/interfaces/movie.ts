export interface MovieCreate {
  code: Number;
  name: string;
  year: Number;
  rating: Number;
  profile: String;
  cinema_id: string;
  time: [string];
  created_user_id: any;
}