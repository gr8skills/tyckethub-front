export interface IUser {
  id: any;
  name: string;
  avatar: string;
  email: string;
  bio?: string;
  country?: string;
  state?: string;
  created_at: Date;
  phone: string;
  password: string;
  address: string;
  role: string;
  email_verified_at: Date;
  access_token?: string;
}
