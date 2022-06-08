import { Document } from 'mongoose';

export default interface INews extends Document {
  title: string;
  description: string;
  active: boolean;
}
