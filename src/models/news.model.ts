import mongoose from 'mongoose';
import INews from '../interfaces/INews';

const newsSchema = new mongoose.Schema<INews>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    technology: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Technology',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'news',
  }
);

export default mongoose.model<INews>('News', newsSchema);
