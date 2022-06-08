import mongoose from 'mongoose';
import ITechnology from '../interfaces/ITechnology';

const newsSchema = new mongoose.Schema<ITechnology>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'technology',
  }
);

export default mongoose.model<ITechnology>('Technology', newsSchema);
