import { Document } from 'mongoose';

export default interface IUser extends Document {
  username: string;
  email: string;
  imgUrl?: string;
  password: string;
  phone?: string;
  language?: 'HINDI' | 'ENGLISH';
  userType: 'ADMIN' | 'AUTHOR' | 'USER';
  gender?: string;
  martialStatus?: string;
  dob?: {
    dd: string;
    mm: string;
    yyyy: string;
  };
  timeOfBirth?: string;
  active: boolean;
}
