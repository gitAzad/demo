import { Document } from 'mongoose';

export default interface INews extends Document {
  title: string;
  description: string;
  imgUrl?: string;
  author?: string;
  technology?: string;
  active: boolean;
}
